using System.Runtime.InteropServices;
using System.Web;
using backend.Constants;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("music")]
public class MusicController : ControllerBase
{
    [HttpGet]
    [Route("download/{key}")]
    public IActionResult GetFile(string key)
    {
        return Ok(key);
        key = HttpUtility.UrlDecode(key.Replace('/', '\\'));

        return Ok(Environment.CurrentDirectory);

        var path = Path.Combine(DirectoryConstants.Assets, $"{key}.mp3");

        // var stream = new FileStream(path, new FileStreamOptions());
        //
        // return new FileStreamResult(stream, "audio/mp3")
        // {
        //     EnableRangeProcessing = true
        // };
    }

    [HttpGet]
    [Route("list")]
    public IActionResult ListAudioFiles()
    {
        var files = Directory.GetFiles(DirectoryConstants.Assets, "*.mp3", SearchOption.AllDirectories)
            .Select(f => f.Substring(DirectoryConstants.Assets.Length + 1).Replace('\\', '/').Replace(".mp3", ""));

        return new JsonResult(files);
    }
}
