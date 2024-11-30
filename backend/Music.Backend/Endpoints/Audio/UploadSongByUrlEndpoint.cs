using FastEndpoints;
using Music.Backend.EndpointFilters;
using Music.Backend.HttpContextExtensions;
using Music.CommandHandlers.Audio;
using Music.Commands.Audio;
using Music.QueryHandlers.Accounts;

namespace Music.Backend.Endpoints.Audio;

public record UrlSongUpload(string Title, string Url, string Source, string MimeType);

public class UploadSongByUrlEndpoint : Endpoint<UrlSongUpload>
{
    private readonly UploadSongByUrlHandler _uploadSongByUrl;
    private readonly GetAccountBySessionIDHandler _getAccountBySessionId;

    public UploadSongByUrlEndpoint(
        UploadSongByUrlHandler uploadSongByUrl,
        GetAccountBySessionIDHandler getAccountBySessionId)
    {
        _uploadSongByUrl = uploadSongByUrl;
        _getAccountBySessionId = getAccountBySessionId;
    }

    public override void Configure()
    {
        Post("/music/uploadByUrl");
        AllowAnonymous();
        Options(x => x.AddEndpointFilter<RequiresAuthenticatedFilter>());
    }

    public override Task HandleAsync(UrlSongUpload req, CancellationToken ct)
    {
        var accountId = _getAccountBySessionId.Execute(HttpContext.Request.GetAuthenticationCookie())!.Id;
        _uploadSongByUrl.Execute(new UploadSongByUrlCommand(req.Title, req.Url, req.Source, accountId, req.MimeType));

        return Task.CompletedTask;
    }
}
