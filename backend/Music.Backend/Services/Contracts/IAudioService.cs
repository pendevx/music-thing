using backend.Models;
using backend.Models.DTO;

namespace backend.Services.Contracts;

public interface IAudioService
{
    StreamedAudio GetAudioById(int id);
    IEnumerable<SongInfo> ListAudioFiles();
    void UploadAudio(Song song);
    void UploadAudio(IEnumerable<Song> songs);
}
