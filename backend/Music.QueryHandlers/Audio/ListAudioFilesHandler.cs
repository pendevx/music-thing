using Music.Repositories.Contracts;
using Music.Repository.EF.Models.Utils;

namespace Music.QueryHandlers.Audio;

public class ListAudioFilesHandler : IBaseQueryHandler<int, IEnumerable<SongInfo>>
{
    private readonly ISongRepository _songRepository;

    public ListAudioFilesHandler(ISongRepository songRepository)
    {
        _songRepository = songRepository;
    }

    public IEnumerable<SongInfo> Execute(int page = 1)
    {
        var audioFiles = _songRepository.Entities
            .Select(song => new SongInfo(song.Id, song.Name));

        return audioFiles;
    }
}
