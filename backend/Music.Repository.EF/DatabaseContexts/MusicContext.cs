using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Music.Repository.EF.Models.Generated;

namespace Music.Repository.EF.DatabaseContexts;

public partial class MusicContext : DbContext
{
    public MusicContext(DbContextOptions<MusicContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<AccountRole> AccountRoles { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<RolePermission> RolePermissions { get; set; }

    public virtual DbSet<Session> Sessions { get; set; }

    public virtual DbSet<Song> Songs { get; set; }

    public virtual DbSet<SongRequest> SongRequests { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Accounts__3214EC078F873733");

            entity.Property(e => e.DisplayName).HasDefaultValue("");
        });

        modelBuilder.Entity<AccountRole>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__AccountR__3214EC07BCECFFE4");

            entity.HasOne(d => d.Account).WithMany(p => p.AccountRoles).HasConstraintName("FK__AccountRo__Accou__74AE54BC");

            entity.HasOne(d => d.Role).WithMany(p => p.AccountRoles).HasConstraintName("FK__AccountRo__RoleI__75A278F5");
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Permissi__3214EC0799218669");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Roles__3214EC07C2771655");
        });

        modelBuilder.Entity<RolePermission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RolePerm__3214EC07D9083FE9");

            entity.HasOne(d => d.Permission).WithMany(p => p.RolePermissions).HasConstraintName("FK__RolePermi__Permi__787EE5A0");

            entity.HasOne(d => d.Role).WithMany(p => p.RolePermissions).HasConstraintName("FK__RolePermi__RoleI__797309D9");
        });

        modelBuilder.Entity<Session>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Sessions__3214EC07A0C7AA82");

            entity.HasOne(d => d.Account).WithMany(p => p.Sessions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Sessions__Accoun__52593CB8");
        });

        modelBuilder.Entity<Song>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Songs__3214EC0777BE66D4");

            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(sysutcdatetime())");
        });

        modelBuilder.Entity<SongRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SongRequ__3214EC07BE7B5A75");

            entity.HasOne(d => d.UploaderAccount).WithMany(p => p.SongRequests)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SongReque__Uploa__5FB337D6");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
