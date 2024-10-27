using Music.Repositories.Contracts;
using Music.Repository.EF.Models.Utils;

namespace Music.QueryHandlers.Audio;

public class GetAudioByIdHandler : IBaseQueryHandler<int, StreamedAudio>
{
    private readonly ISongRepository _songRepository;

    public GetAudioByIdHandler(ISongRepository songRepository)
    {
        _songRepository = songRepository;
    }

    public StreamedAudio Execute(int id)
    {
        var audio = _songRepository.GetById(id);

        if (audio is null)
            throw new FileNotFoundException($"The audio of ID=${id} doesn't exist.");

        return audio;
    }
}
