using Music.Backend.Repositories;
using Music.Backend.Utils;

namespace Music.Backend.Models.DTO;

public class StreamedAudio : Entity
{
    public Guid Guid { get; set; }
    public string MimeType { get; set; }
    public LazyLoad<Stream> Contents { get; set; } = null!;
}
