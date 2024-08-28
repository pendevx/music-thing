using backend.Models;

namespace backend.Services.Contracts;

public interface IAudioService
{
    StreamedAudio GetAudioById(int id);
    IEnumerable<string> ListAudioFiles();
}
