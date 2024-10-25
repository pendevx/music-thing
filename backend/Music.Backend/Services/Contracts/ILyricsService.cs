using Music.Backend.Models.DTO.Http;

namespace Music.Backend.Services.Contracts;

public interface ILyricsService
{
    IEnumerable<LyricsLine> GetLyrics(string key);
}
