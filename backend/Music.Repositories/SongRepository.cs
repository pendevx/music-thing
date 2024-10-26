using Microsoft.Data.SqlTypes;
using Music.Repositories.Contracts;
using Music.Repository.EF.DatabaseContexts;
using Music.Repository.EF.Models.Generated;
using Music.Repository.EF.Models.Utils;

namespace Music.Repositories;

public class SongRepository : GenericRepository<Song>, ISongRepository
{
    public SongRepository(MusicContext ctx) : base(ctx)
    {

    }

    private Stream GetAudioStream(int id)
    {
        var transaction = BeginTransaction();

        var token = ExecuteScalar<byte[]>("SELECT GET_FILESTREAM_TRANSACTION_CONTEXT()", transaction);
        var path = ExecuteScalar<string>($"SELECT Contents.PathName() FROM Songs WHERE Id = {id}", transaction);

        var sqlFileStream = new SqlFileStream(path, token, FileAccess.Read);

        return sqlFileStream;
    }

    public new StreamedAudio? GetById(int id)
    {
        // project before returning, so the Contents aren't loaded into memory.
        return Entities
            .Select(song => new StreamedAudio
            {
                Id = song.Id,
                Guid = song.Guid,
                MimeType = song.MimeType,
                Contents = LazyLoad.Create(() => GetAudioStream(id))
            })
            .FirstOrDefault(song => song.Id == id);
    }
}
