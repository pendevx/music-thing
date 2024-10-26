using System.ComponentModel.DataAnnotations;

namespace Music.Repository.EF;

public class Entity
{
    [Key]
    public int Id { get; set; }

    public DateTime CreatedOn { get; set; }
}
