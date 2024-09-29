using Music.Backend.Models.DTO.HttpResponses;

namespace Music.Backend.Services.Contracts;

public interface ILyricsService
{
    IEnumerable<LyricsLine> GetLyrics(string key);
}
