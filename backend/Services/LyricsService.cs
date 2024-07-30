using System.Text.RegularExpressions;
using System.Web;
using backend.Constants;
using backend.Models.DTO;
using backend.Services.Contracts;

namespace backend.Services;

public class LyricsService : ILyricsService
{
    private static string AssetsPath => DirectoryConstants.Assets;

    private LyricsLine ProcessLyricsLine(string line)
    {
        var regex = new Regex(@"\[(\d{2}):(\d{2})\.(\d{2})\](.*)", RegexOptions.IgnoreCase);
        var matches = regex.Matches(line)[0].Groups;

        return new LyricsLine()
        {
            Time = int.Parse(matches[1].Value) * 60 + int.Parse(matches[2].Value) + int.Parse(matches[3].Value) / 1000,
            Words = matches[4].Value
        };
    }

    public IEnumerable<LyricsLine> GetLyrics(string key)
    {
        key = HttpUtility.UrlDecode(key);
        key = Path.Combine(AssetsPath, $"{key}.lrc");
        var lyrics = File.ReadAllText(key);

        var content = lyrics.Split("\n")
            .Where(lyric => lyric != "")
            .Select(ProcessLyricsLine);

        return content;
    }
}
