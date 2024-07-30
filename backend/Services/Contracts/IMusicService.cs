namespace backend.Services.Contracts;

public interface IMusicService
{
    FileStream GetAudioStream(string key);
    IEnumerable<string> ListAudioFiles();
}
