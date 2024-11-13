using FastEndpoints;
using Microsoft.AspNetCore.Authorization;
using Music.CommandHandlers.Audio;

namespace Music.Backend.Endpoints.Audio;

[HttpGet("/audio/upload/silent")]
[AllowAnonymous]
public class UploadSongEndpoint : Ep.NoReq.NoRes
{
    private readonly UploadSongHandler _uploadSongHandler;

    public UploadSongEndpoint(UploadSongHandler uploadSongHandler)
    {
        _uploadSongHandler = uploadSongHandler;
    }

    public override Task HandleAsync(CancellationToken ct)
    {
        _uploadSongHandler.Execute(null!);
        return Task.CompletedTask;
    }
}
