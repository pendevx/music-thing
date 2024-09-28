using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Music.Backend.Repositories;

namespace Music.Backend.Models;

[Table("DB_SCHEMA_VERSION")]
public partial class DbSchemaVersion : Entity
{
    public int? LastRunScriptId { get; set; }

    [StringLength(24)]
    [Unicode(false)]
    public string? LastDbUpdateOn { get; set; }

    [ForeignKey("LastRunScriptId")]
    [InverseProperty("DbSchemaVersions")]
    public virtual DbSchemaVersionScript? LastRunScript { get; set; }
}
