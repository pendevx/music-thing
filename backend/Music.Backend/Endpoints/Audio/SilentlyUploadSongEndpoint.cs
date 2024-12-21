using FastEndpoints;
using Microsoft.AspNetCore.Authorization;
using Music.CommandHandlers.Audio;

namespace Music.Backend.Endpoints.Audio;

[HttpGet("/audio/upload/silent")]
[AllowAnonymous]
public class SilentlyUploadSongEndpoint : Ep.NoReq.NoRes
{
    private readonly SilentlyUploadSongHandler _silentlyUploadSong;

    public SilentlyUploadSongEndpoint(SilentlyUploadSongHandler silentlyUploadSong)
    {
        _silentlyUploadSong = silentlyUploadSong;
    }

    public override Task HandleAsync(CancellationToken ct)
    {
        _silentlyUploadSong.Execute();
        return Task.CompletedTask;
    }
}
