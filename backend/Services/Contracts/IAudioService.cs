using backend.Models;

namespace backend.Services.Contracts;

public interface IAudioService
{
    StreamedAudio GetAudioById(int id);
    IEnumerable<string> ListAudioFiles();
    void UploadAudio(Song song);
    void UploadAudio(IEnumerable<Song> songs);
}
