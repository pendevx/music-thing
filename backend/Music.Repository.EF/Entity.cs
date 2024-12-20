using System.ComponentModel.DataAnnotations;

namespace Music.Repository.EF;

public class Entity
{
    protected Entity()
    {
        CreatedOn = DateTime.UtcNow;
    }

    [Key]
    public int Id { get; set; }

    public DateTime CreatedOn { get; set; }
}
