using backend.Constants;
using backend.Services.Contracts;

namespace backend.Services;

public class MusicService : IMusicService
{
    private static string AssetsPath => DirectoryConstants.Assets;

    public FileStream GetAudioStream(string key)
    {
        key = Path.Combine(AssetsPath, $"{key}.mp3");
        return new FileStream(key, new FileStreamOptions());
    }

    public IEnumerable<string> ListAudioFiles()
    {
        return Directory.GetFiles(AssetsPath, "*.mp3", SearchOption.AllDirectories)
            .Select(f => f[(AssetsPath.Length + 1)..].Replace('\\', '/').Replace(".mp3", ""));
    }
}
