using backend.Models.DTO;

namespace backend.Services.Contracts;

public interface ILyricsService
{
    IEnumerable<LyricsLine> GetLyrics(string key);
}
