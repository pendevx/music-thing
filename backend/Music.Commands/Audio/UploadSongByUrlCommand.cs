namespace Music.Commands.Audio;

public record UploadSongByUrlCommand(string Title, string Url, UploadSongSource Source);

public enum UploadSongSource
{
    YouTube,
    YouTubeMusic,
    Soundcloud,
}
