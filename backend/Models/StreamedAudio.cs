using Microsoft.Data.SqlTypes;

namespace backend.Models;

public class StreamedAudio : Song
{
    public new SqlFileStream Contents { get; set; } = null!;
}
