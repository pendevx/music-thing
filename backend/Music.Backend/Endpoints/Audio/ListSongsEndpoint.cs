using FastEndpoints;
using Music.Backend.Models.DTO.Http;
using Music.Backend.Services.Contracts;

namespace Music.Backend.Endpoints.Audio;

public class ListSongs : Ep.NoReq.Res<IEnumerable<SongInfo>>
{
    private readonly IAudioService _audioService;

    public ListSongs(IAudioService audioService)
    {
        _audioService = audioService;
    }

    public override void Configure()
    {
        Get("/music/list");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var files = _audioService.ListAudioFiles();
        await SendAsync(files, 200, ct);
    }
}
