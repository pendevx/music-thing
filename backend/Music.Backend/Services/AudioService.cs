using Music.Backend.Constants;
using Music.Backend.Models.DTO.Http;
using Music.Backend.Services.Contracts;
using Music.Database.Entities;
using Music.Repositories.Contracts;

namespace Music.Backend.Services;

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

    public IEnumerable<SongInfo> ListAudioFiles()
    {
        var audioFiles = _songRepository.Entities
            .Select(song => new SongInfo(song.Id, song.Name));

        return audioFiles;
    }
}
