using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("lyrics")]
public class LyricsController : ControllerBase
{
    private readonly string _assetsDirectory = Path.Combine(Environment.CurrentDirectory, "assets");

    [HttpGet]
    [Route("download/{key}")]
    public IActionResult GetFile(string key)
    {
        try
        {
            var path = Path.Combine(_assetsDirectory, $"{key}.lrc");
            var content = System.IO.File.ReadAllText(path);

            return Content(content);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return NotFound();
        }
    }
}
