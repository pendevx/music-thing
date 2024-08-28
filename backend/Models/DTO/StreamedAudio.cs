namespace backend.Models.DTO;

public class StreamedAudio : Song
{
    public new Stream Contents { get; set; } = null!;
}
