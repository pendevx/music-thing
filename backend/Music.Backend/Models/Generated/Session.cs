using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Music.Backend.Models.Generated;

[Index("Token", Name = "UQ__Sessions__1EB4F817630CAA66", IsUnique = true)]
public partial class Session
{
    [Key]
    public int Id { get; set; }

    public int AccountId { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime ExpiresOn { get; set; }

    public Guid Token { get; set; }

    [ForeignKey("AccountId")]
    [InverseProperty("Sessions")]
    public virtual Account Account { get; set; } = null!;
}
