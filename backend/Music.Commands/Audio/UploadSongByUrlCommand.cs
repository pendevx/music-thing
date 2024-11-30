namespace Music.Commands.Audio;

public record UploadSongByUrlCommand(string Title, string Url, string Source, int AccountId, string MimeType);
