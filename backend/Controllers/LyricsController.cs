using System.Web;
using backend.Constants;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("lyrics")]
public class LyricsController : ControllerBase
{
    [HttpGet]
    [Route("download/{key}")]
    public IActionResult GetFile(string key)
    {
        key = HttpUtility.UrlDecode(key.Replace('/', '\\'));
        var path = Path.Combine(DirectoryConstants.Assets, $"{key}.lrc");
        var content = System.IO.File.ReadAllText(path);

        return Content(content);
    }
}
