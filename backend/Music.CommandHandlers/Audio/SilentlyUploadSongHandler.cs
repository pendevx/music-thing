using Music.Repositories.Contracts;
using Music.Repository.EF.Models.Generated;

namespace Music.CommandHandlers.Audio;

public class SilentlyUploadSongHandler : IBaseCommandHandler
{
    private readonly ISongRepository _songRepository;

    public SilentlyUploadSongHandler(ISongRepository songRepository)
    {
        _songRepository = songRepository;
    }

    public void Execute()
    {
        // Silently scan ON THE SERVER
        var files = Directory.GetFiles(@"C:\Downloads");
        foreach (var file in files)
        {
            var content = File.ReadAllBytes(file);
            _songRepository.Create(new Song
            {
                Contents = content,
                Name = file[(file.LastIndexOf('\\') + 1)..],
                MimeType = "audio/mpeg"
            });
        }

        // Remove once added
        foreach (var file in files)
        {
            File.Delete(file);
        }
    }
}
