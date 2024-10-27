using FastEndpoints;
using Microsoft.AspNetCore.Authorization;
using Music.Backend.EndpointProcessors.PostProcessors;
using Music.Backend.EndpointProcessors.PreProcessors;
using Music.QueryHandlers.Audio;
using Music.Repository.EF.Models.Utils;

namespace Music.Backend.Endpoints.Audio;

public record GetSongRequest(int Id);

[HttpGet("/music/download/{id}")]
[PreProcessor<OpenDbConnection<GetSongRequest>>]
[PostProcessor<CloseDbConnection<GetSongRequest, StreamedAudio>>]
[AllowAnonymous]
public class GetSongEndpoint : Endpoint<GetSongRequest, StreamedAudio>
{
    private readonly GetAudioByIdHandler _getAudioById;

    public GetSongEndpoint(GetAudioByIdHandler getAudioById)
    {
        _getAudioById = getAudioById;
    }

    public override async Task HandleAsync(GetSongRequest req, CancellationToken ct)
    {
        var audio = _getAudioById.Execute(req.Id);

        await SendStreamAsync(
            audio.Contents.Value,
            contentType: audio.MimeType,
            enableRangeProcessing: true,
            cancellation: ct);
    }
}
