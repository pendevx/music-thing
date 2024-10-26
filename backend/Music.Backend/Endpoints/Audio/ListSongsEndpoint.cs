using FastEndpoints;
using Microsoft.AspNetCore.Authorization;
using Music.Backend.Models.DTO.Http;
using Music.Backend.Services.Contracts;

namespace Music.Backend.Endpoints.Audio;

[HttpGet("/music/list")]
[AllowAnonymous]
public class ListSongs : Ep.NoReq.Res<IEnumerable<SongInfo>>
{
    private readonly IAudioService _audioService;

    public ListSongs(IAudioService audioService)
    {
        _audioService = audioService;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var files = _audioService.ListAudioFiles();
        await SendAsync(files, 200, ct);
    }
}
