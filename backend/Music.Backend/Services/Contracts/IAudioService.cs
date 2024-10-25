using Music.Backend.Models.DTO.Http;
using Music.Backend.Models.Generated;

namespace Music.Backend.Services.Contracts;

public interface IAudioService
{
    StreamedAudio GetAudioById(int id);
    IEnumerable<SongInfo> ListAudioFiles();
    void UploadAudio(Song song);
    void UploadAudio(IEnumerable<Song> songs);
}
