using System.ComponentModel.DataAnnotations;

namespace Music.Backend.Repositories;

public class Entity
{
    [Key]
    public int Id { get; set; }
}
