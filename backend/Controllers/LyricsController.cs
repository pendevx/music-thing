using backend.Attributes;
using backend.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("lyrics")]
public class LyricsController : ControllerBase
{
    private readonly ILyricsService _lyricsService;

    public LyricsController(ILyricsService lyricsService)
    {
        _lyricsService = lyricsService;
    }

    [HttpGet]
    [Route("download/{key}")]
    [DecodeUrl]
    public IActionResult GetFile(string key)
    {
        var lyrics = _lyricsService.GetLyrics(key);

        return new JsonResult(lyrics);
    }
}
