using Music.Backend.Models.DTO;

namespace Music.Backend.Services.Contracts;

public interface ILyricsService
{
    IEnumerable<LyricsLine> GetLyrics(string key);
}
