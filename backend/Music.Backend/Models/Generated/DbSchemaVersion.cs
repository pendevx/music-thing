using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Music.Backend.Models.Generated;

[Table("DB_SCHEMA_VERSION")]
public partial class DbSchemaVersion
{
    [Key]
    public int Id { get; set; }

    public int? LastRunScriptId { get; set; }

    [StringLength(24)]
    [Unicode(false)]
    public string? LastDbUpdateOn { get; set; }

    [ForeignKey("LastRunScriptId")]
    [InverseProperty("DbSchemaVersions")]
    public virtual DbSchemaVersionScript? LastRunScript { get; set; }
}
