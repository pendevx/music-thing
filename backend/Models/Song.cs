using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

[Index("Guid", Name = "UQ__Songs__A2B5777DDF8D05C4", IsUnique = true)]
public partial class Song
{
    [Key]
    public int Id { get; set; }

    public Guid Guid { get; set; }

    public byte[] Contents { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string MimeType { get; set; } = null!;
}
