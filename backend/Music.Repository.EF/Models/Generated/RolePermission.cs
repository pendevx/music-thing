using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Music.Repository.EF.Models.Generated;

public partial class RolePermission : Entity
{
    public RolePermission() : base()
    {
    }

    public int? PermissionId { get; set; }

    public int? RoleId { get; set; }

    [ForeignKey("PermissionId")]
    [InverseProperty("RolePermissions")]
    public virtual Permission? Permission { get; set; }

    [ForeignKey("RoleId")]
    [InverseProperty("RolePermissions")]
    public virtual Role? Role { get; set; }
}
