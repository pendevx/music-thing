using FastEndpoints;
using Microsoft.AspNetCore.Authorization;
using Music.QueryHandlers.Audio;
using Music.Repository.EF.Models.Utils;

namespace Music.Backend.Endpoints.Audio;

[HttpGet("/music/list")]
[AllowAnonymous]
public class ListSongs : Ep.NoReq.Res<IEnumerable<SongInfo>>
{
    private readonly ListAudioFilesHandler _listAudioFiles;

    public ListSongs(ListAudioFilesHandler listAudioFiles)
    {
        _listAudioFiles = listAudioFiles;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var files = _listAudioFiles.Execute();
        await SendAsync(files, 200, ct);
    }
}
