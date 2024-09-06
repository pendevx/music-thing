using backend.Repositories;
using backend.Utils;

namespace backend.Models.DTO;

public class StreamedAudio : Entity
{
    public Guid Guid { get; set; }
    public string MimeType { get; set; }
    public LazyLoad<Stream> Contents { get; set; } = null!;
}
