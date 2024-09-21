using Microsoft.AspNetCore.Mvc;
using Music.Backend.Attributes;
using Music.Backend.Models.DTO;
using Music.Backend.Services.Contracts;

namespace Music.Backend.Controllers;

[ApiController]
[Route("music")]
public class AudioController : ControllerBase
{
    private readonly IAudioService _audioService;

    public AudioController(IAudioService audioService)
    {
        _audioService = audioService;
    }

    [HttpGet]
    [Route("download/{id}")]
    [RequiresDbConnection]
    public IActionResult GetFile(int id)
    {
        var audio = _audioService.GetAudioById(id);

        return new FileStreamResult(audio.Contents.Value, audio.MimeType)
        {
            EnableRangeProcessing = true
        };
    }

    [HttpGet]
    [Route("list")]
    public ActionResult<IEnumerable<SongInfo>> ListAudioFiles()
    {
        var files = _audioService.ListAudioFiles();

        return new JsonResult(files);
    }
}
