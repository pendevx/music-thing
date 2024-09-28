using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Music.Backend.Models;

namespace Music.Backend.DatabaseContexts;

public partial class MusicContext : DbContext
{
    public MusicContext(DbContextOptions<MusicContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<DbSchemaVersion> DbSchemaVersions { get; set; }

    public virtual DbSet<DbSchemaVersionScript> DbSchemaVersionScripts { get; set; }

    public virtual DbSet<Song> Songs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Accounts__3214EC078F873733");
        });

        modelBuilder.Entity<DbSchemaVersion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DB_SCHEM__3214EC0747347B6F");

            entity.Property(e => e.LastDbUpdateOn).IsFixedLength();

            entity.HasOne(d => d.LastRunScript).WithMany(p => p.DbSchemaVersions).HasConstraintName("FK__DB_SCHEMA__LastR__3C69FB99");
        });

        modelBuilder.Entity<DbSchemaVersionScript>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DB_SCHEM__3214EC07AC1EF7BF");

            entity.Property(e => e.ExecutedOn).IsFixedLength();
        });

        modelBuilder.Entity<Song>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Songs__3214EC0777BE66D4");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
