using backend.Constants;
using backend.Models;
using backend.Models.DTO;
using backend.Repositories.Contracts;
using backend.Services.Contracts;

namespace backend.Services;

public class AudioService : IAudioService
{
    private readonly ISongRepository _songRepository;
    
    public AudioService(ISongRepository songRepository)
    {
        _songRepository = songRepository;
    }
    
    private static string AssetsPath => DirectoryConstants.Assets;

    public StreamedAudio GetAudioById(int id)
    {
        var audio = _songRepository.GetById(id);

        if (audio is null)
            throw new FileNotFoundException($"The audio of ID=${id} doesn't exist.");

        return audio;
    }

    public void UploadAudio(Song song)
    {
        _songRepository.Create(song);
    }

    public void UploadAudio(IEnumerable<Song> songs)
    {
        _songRepository.Create(songs);
    }

    public IEnumerable<string> ListAudioFiles()
    {
        return Directory.GetFiles(AssetsPath, "*.mp3", SearchOption.AllDirectories)
            .Select(f => f[(AssetsPath.Length + 1)..].Replace('\\', '/').Replace(".mp3", ""));
    }
}
