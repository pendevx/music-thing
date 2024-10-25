using Microsoft.AspNetCore.Mvc;
using Music.Backend.Attributes;
using Music.Backend.Models.DTO.Http;
using Music.Backend.Services.Contracts;

namespace Music.Backend.Controllers;

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
    public ActionResult<IEnumerable<LyricsLine>> GetFile(string key)
    {
        var lyrics = _lyricsService.GetLyrics(key);

        return new JsonResult(lyrics);
    }
}
