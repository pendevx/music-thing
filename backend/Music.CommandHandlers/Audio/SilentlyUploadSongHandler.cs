using Music.Repositories.Contracts;
using Music.Repository.EF.DatabaseContexts;
using Music.Repository.EF.Models.Generated;

namespace Music.CommandHandlers.Audio;

public class SilentlyUploadSongHandler : IBaseCommandHandler
{
    private readonly MusicContext _musicContext;

    public SilentlyUploadSongHandler(MusicContext musicContext)
    {
        _musicContext = musicContext;
    }

    public void Execute()
    {
        // Silently scan ON THE SERVER
        var files = Directory.GetFiles(@"C:\Downloads");
        foreach (var file in files)
        {
            var content = File.ReadAllBytes(file);
            _musicContext.Songs.Add(new Song
            {
                Contents = content,
                Name = file[(file.LastIndexOf('\\') + 1)..],
                MimeType = "audio/mpeg"
            });
        }

        _musicContext.SaveChanges();

        // Remove once added
        foreach (var file in files)
        {
            File.Delete(file);
        }
    }
}
