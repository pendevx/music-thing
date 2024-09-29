using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Music.Backend.Models.Generated;

[Table("DB_SCHEMA_VERSION_SCRIPTS")]
public partial class DbSchemaVersionScript
{
    [Key]
    public int Id { get; set; }

    [StringLength(200)]
    public string? ScriptName { get; set; }

    [StringLength(24)]
    [Unicode(false)]
    public string? ExecutedOn { get; set; }

    [InverseProperty("LastRunScript")]
    public virtual ICollection<DbSchemaVersion> DbSchemaVersions { get; set; } = new List<DbSchemaVersion>();
}
