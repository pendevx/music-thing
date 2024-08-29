using backend.Repositories;

namespace backend.Models.DTO;

public class StreamedAudio : Entity
{
    public Guid Guid { get; set; }
    public string MimeType { get; set; }
    public Stream Contents { get; set; } = null!;
}
