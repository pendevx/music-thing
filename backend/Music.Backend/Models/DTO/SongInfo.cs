namespace Music.Backend.Models.DTO;

public class SongInfo
{
    public SongInfo(int id, string name)
    {
        Id = id;
        Name = name;
    }

    public int Id { get; }

    public string Name { get; }
}
