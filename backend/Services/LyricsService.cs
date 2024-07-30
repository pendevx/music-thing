using System.Web;
using backend.Constants;
using backend.Services.Contracts;

namespace backend.Services;

public class LyricsService : ILyricsService
{
    private static string AssetsPath => DirectoryConstants.Assets;

    public string GetLyrics(string key)
    {
        key = HttpUtility.UrlDecode(key);
        key = Path.Combine(AssetsPath, $"{key}.lrc");
        return File.ReadAllText(key);
    }
}
