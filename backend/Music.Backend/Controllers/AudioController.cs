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
    public IActionResult ListAudioFiles()
    {
        var files = _audioService.ListAudioFiles();

        return new JsonResult(files);
    }
}
