namespace Music.Repository.EF.Models.Utils;

public class StreamedAudio : Entity
{
    public Guid Guid { get; set; }
    public string MimeType { get; set; } = null!;
    public LazyLoad<Stream> Contents { get; set; } = null!;
}
