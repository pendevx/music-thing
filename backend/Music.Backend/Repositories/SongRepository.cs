using Microsoft.Data.SqlTypes;
using Music.Backend.DatabaseContexts;
using Music.Backend.Models.DTO;
using Music.Backend.Models.Generated;
using Music.Backend.Repositories.Contracts;
using Music.Backend.Utils;

namespace Music.Backend.Repositories;

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
        return base.GetById(
            id,
            song => new StreamedAudio
            {
                Id = song.Id,
                Guid = song.Guid,
                MimeType = song.MimeType,
                Contents = LazyLoad.Create(() => GetAudioStream(id))
            }
        );
    }
}
