using FastEndpoints;
using Microsoft.AspNetCore.Authorization;
using Music.CommandHandlers.Audio;
using Music.Commands.Audio;

namespace Music.Backend.Endpoints.Audio;

public record UrlSongUpload(string Title, string Url, string Source);

[HttpPost("/music/uploadByUrl")]
[AllowAnonymous]
public class UploadSongByUrlEndpoint : Endpoint<UrlSongUpload>
{
    private readonly UploadSongByUrlHandler _uploadSongByUrl;

    public UploadSongByUrlEndpoint(
        UploadSongByUrlHandler uploadSongByUrl)
    {
        _uploadSongByUrl = uploadSongByUrl;
    }

    public override Task HandleAsync(UrlSongUpload req, CancellationToken ct)
    {
        if (Enum.TryParse(req.Source, out UploadSongSource source))
            _uploadSongByUrl.Execute(new UploadSongByUrlCommand(req.Title, req.Url, source));

        return Task.CompletedTask;
    }
}
