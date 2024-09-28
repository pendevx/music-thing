using System.ComponentModel.DataAnnotations;
using Music.Backend.Repositories;

namespace Music.Backend.Models;

public partial class Account : Entity
{
    public Guid Guid { get; set; }

    [StringLength(256)]
    public string Username { get; set; } = null!;

    public byte[] SaltedPassword { get; set; } = null!;

    public DateTime CreatedOn { get; set; }
}
