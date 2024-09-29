using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Music.Backend.Models.Generated;

[Index("Username", Name = "Accounts_Username_Unique", IsUnique = true)]
[Index("Guid", Name = "UQ__Accounts__A2B5777DA7795D85", IsUnique = true)]
public partial class Account
{
    [Key]
    public int Id { get; set; }

    public Guid Guid { get; set; }

    [StringLength(256)]
    public string Username { get; set; } = null!;

    public byte[] SaltedPassword { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    [StringLength(30)]
    public string DisplayName { get; set; } = null!;

    [InverseProperty("Account")]
    public virtual ICollection<Session> Sessions { get; set; } = new List<Session>();
}
