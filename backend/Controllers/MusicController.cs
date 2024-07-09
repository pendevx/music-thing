using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace backend.Controllers;

[ApiController]
[Route("music")]
public class MusicController : ControllerBase
{
    private readonly string _assetsDirectory = Path.Combine(Environment.CurrentDirectory, "assets");

    [HttpGet]
    [Route("{key}")]
    public IActionResult GetFile(string key)
    {
        try
        {
            var path = Path.Combine(_assetsDirectory, $"{key}.mp3");
            var stream = new FileStream(path, new FileStreamOptions());

            return new FileStreamResult(stream, "audio/mp3")
            {
                EnableRangeProcessing = true
            };
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return NotFound();
        }
    }

    [HttpGet]
    public IActionResult ListAudioFiles()
    {
        var regex = new Regex(@".*\\(.*)\.mp3");

        var files = Directory.GetFiles(_assetsDirectory, "*.mp3", SearchOption.AllDirectories).Select(f =>
        {
            var fileName = regex.Matches(f)?[0].Groups[1].Value ?? null;
            return fileName;
        });

        return new JsonResult(files);
    }
}
