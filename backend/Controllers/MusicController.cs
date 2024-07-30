using backend.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("music")]
public class MusicController : ControllerBase
{
    private readonly IMusicService _musicService;

    public MusicController(IMusicService musicService)
    {
        _musicService = musicService;
    }

    [HttpGet]
    [Route("download/{key}")]
    public IActionResult GetFile(string key)
    {
        var stream = _musicService.GetAudioStream(key);

        return new FileStreamResult(stream, "audio/mp3")
        {
            EnableRangeProcessing = true
        };
    }

    [HttpGet]
    [Route("list")]
    public IActionResult ListAudioFiles()
    {
        var files = _musicService.ListAudioFiles();

        return new JsonResult(files);
    }
}
