using backend.Attributes;
using backend.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

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
    [Route("download/{key}")]
    [DecodeUrl]
    [RequiresDbConnection]
    public IActionResult GetFile(string key)
    {
        var audio = _audioService.GetAudioById(1);

        return new FileStreamResult(audio.Contents, audio.MimeType)
        {
            EnableRangeProcessing = true
        };
    }

    [HttpGet]
    [Route("list")]
    public IActionResult ListAudioFiles()
    {
        var files = _audioService.ListAudioFiles();

        return new JsonResult(files);
    }
}
