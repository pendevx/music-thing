using System.ComponentModel.DataAnnotations;

namespace Music.Backend.Models.Generated;

public class Entity
{
    [Key]
    public int Id { get; set; }

    public DateTime CreatedOn { get; set; }
}
