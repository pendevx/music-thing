using System.ComponentModel.DataAnnotations;

namespace Music.Database.Entities;

public class Entity
{
    [Key]
    public int Id { get; set; }

    public DateTime CreatedOn { get; set; }
}
