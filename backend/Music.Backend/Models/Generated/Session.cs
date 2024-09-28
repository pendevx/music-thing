using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Music.Backend.Models.Generated;

public partial class Session
{
    [Key]
    public int Id { get; set; }

    public int AccountId { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime ExpiresOn { get; set; }

    [ForeignKey("AccountId")]
    [InverseProperty("Sessions")]
    public virtual Account Account { get; set; } = null!;
}
