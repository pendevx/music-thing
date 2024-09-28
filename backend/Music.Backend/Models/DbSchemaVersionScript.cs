using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Music.Backend.Repositories;

namespace Music.Backend.Models;

[Table("DB_SCHEMA_VERSION_SCRIPTS")]
public partial class DbSchemaVersionScript : Entity
{
    [StringLength(200)]
    public string? ScriptName { get; set; }

    [StringLength(24)]
    [Unicode(false)]
    public string? ExecutedOn { get; set; }

    [InverseProperty("LastRunScript")]
    public virtual ICollection<DbSchemaVersion> DbSchemaVersions { get; set; } = new List<DbSchemaVersion>();
}
