using System.ComponentModel.DataAnnotations;
using backend.DatabaseContexts;
using backend.Models;
using backend.Repositories.Contracts;
using Microsoft.Data.SqlTypes;

namespace backend.Repositories;

public class SongRepository : GenericRepository, ISongRepository
{
    public SongRepository(MusicContext ctx) : base(ctx)
    {
        
    }
    
    private SqlFileStream GetSongStream(int id)
    {
        var transaction = BeginTransaction();

        var token = ExecuteScalar<byte[]>("SELECT GET_FILESTREAM_TRANSACTION_CONTEXT()", transaction);
        var path = ExecuteScalar<string>($"SELECT Contents.PathName() FROM Songs WHERE Id = {id}", transaction);

        var sqlFileStream = new SqlFileStream(path, token, FileAccess.Read);

        return sqlFileStream;
    }

    public StreamedAudio GetById(int id)
    {
        var song = MusicContext.Songs
            .Select(s => new { s.Id, s.Guid, s.MimeType })
            .FirstOrDefault(s => s.Id == id);

        if (song is null)
            throw new ValidationException($"The song with ID={id} couldn't be found.");

        return new StreamedAudio
        {
            Guid = song.Guid,
            Id = song.Id,
            MimeType = song.MimeType,
            Contents = GetSongStream(id)
        };
    }

    public void CreateMany(IEnumerable<Song> songs)
    {
        MusicContext.Songs.AddRange(songs);
        MusicContext.SaveChanges();
    }

    public void Create(Song song)
    {
        MusicContext.Songs.Add(song);
        MusicContext.SaveChanges();
    }
}
