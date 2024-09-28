using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Music.Backend.Repositories;

namespace Music.Backend.Models;

public partial class Song : Entity
{
    public Guid Guid { get; set; }

    [StringLength(256)]
    public string Name { get; set; } = null!;

    public byte[] Contents { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string MimeType { get; set; } = null!;
}
