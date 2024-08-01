using System.Text.RegularExpressions;
using backend.Constants;
using backend.Models.DTO;
using backend.Services.Contracts;

namespace backend.Services;

public class LyricsService : ILyricsService
{
    private static string AssetsPath => DirectoryConstants.Assets;

    private LyricsLine ProcessLyricsLine(string line)
    {
        int ToSeconds(string mins, string secs, string ms)
            => int.Parse(mins) * 60 + int.Parse(secs) + int.Parse(ms) / 1000;

        var regex = new Regex(@"\[(\d{2}):(\d{2})\.(\d{2})\](.*)", RegexOptions.IgnoreCase);
        var groups = regex.Matches(line)[0].Groups;

        return new LyricsLine()
        {
            Time = ToSeconds(groups[1].Value, groups[2].Value, groups[3].Value),
            Words = groups[4].Value
        };
    }

    public IEnumerable<LyricsLine> GetLyrics(string key)
    {
        key = Path.Combine(AssetsPath, $"{key}.lrc");
        var lyrics = File.ReadAllText(key);

        var content = lyrics.Split("\n")
            .Where(lyric => lyric != "")
            .Select(ProcessLyricsLine);

        return content;
    }
}
