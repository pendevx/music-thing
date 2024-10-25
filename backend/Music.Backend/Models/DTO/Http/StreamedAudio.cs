using Music.Backend.Models.Generated;
using Music.Backend.Utils;

namespace Music.Backend.Models.DTO.Http;

public class StreamedAudio : Entity
{
    public Guid Guid { get; set; }
    public string MimeType { get; set; } = null!;
    public LazyLoad<Stream> Contents { get; set; } = null!;
}
