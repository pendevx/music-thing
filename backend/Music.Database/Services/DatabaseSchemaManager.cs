using System.Reflection;
using Microsoft.Extensions.Configuration;
using Music.Database.Services.Contracts;
using Music.Database.Services.Repositories;

namespace Music.Database.Services;

public class DatabaseSchemaManager : IDatabaseSchemaManager
{
    private readonly IRepository _repository;
    private readonly string? _databaseName;

    private const string ScriptsPrefix = "Music.Database.Scripts.";

    public DatabaseSchemaManager(IRepository repository, IConfiguration configuration)
    {
        _repository = repository;
        _databaseName = configuration.GetValue<string>("DatabaseName");
    }

    public void Run()
    {
        var thisAssembly = Assembly.GetExecutingAssembly();
        var embeddedResources = thisAssembly.GetManifestResourceNames();
        Array.Sort(embeddedResources);

        var setupScripts = ExtractUnexecutedScripts(embeddedResources.Where(s => s.StartsWith($"{ScriptsPrefix}_01_DbSetup")));
        var updateScripts = ExtractUnexecutedScripts(embeddedResources.Where(s => s.StartsWith($"{ScriptsPrefix}_02_UpdateDb")));

        _repository.UseDatabase(_databaseName);
        SetupDatabase(thisAssembly, setupScripts);
        SetupVersioningTables();
        UpdateSchema(thisAssembly, updateScripts);
    }

    private void SetupDatabase(Assembly assembly, IEnumerable<string> setupScripts)
    {
        CreateDatabaseIfNotExists();
        ExecuteAllScripts(assembly, setupScripts);
    }

    private void CreateDatabaseIfNotExists()
    {
        _repository.ExecuteScript(
            $"""
             IF NOT EXISTS (
                 SELECT * FROM sys.databases WHERE name = '{_databaseName}'
             )
                 BEGIN
                     CREATE DATABASE [{_databaseName}]
                 END

             """);
    }

    private void SetupVersioningTables()
    {
        // Check for existence of the versioning tables
        var exists = _repository.ExecuteScalar<string>(
            """
            SELECT TABLE_NAME 
            FROM MusicThing.INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'DB_SCHEMA_VERSION'
            """);

        // Create the versioning tables if they don't exist
        if (string.IsNullOrWhiteSpace(exists))
        {
            _repository.ExecuteScript(
                """
                CREATE TABLE DB_SCHEMA_VERSION_SCRIPTS (
                    Id INT PRIMARY KEY IDENTITY(1,1),
                    ScriptName NVARCHAR(200),
                    ExecutedOn CHAR(24)
                )
                """);

            _repository.ExecuteScript(
                """
                CREATE TABLE DB_SCHEMA_VERSION (
                    Id INT PRIMARY KEY IDENTITY(1,1),
                    LastRunScriptId INT FOREIGN KEY REFERENCES DB_SCHEMA_VERSION_SCRIPTS,
                    LastDbUpdateOn CHAR(24)
                )
                """);
        }
    }

    private void UpdateSchema(Assembly assembly, IEnumerable<string> schemaUpdateScripts)
    {
        ExecuteAllScripts(assembly, schemaUpdateScripts);
    }

    private void ExecuteAllScripts(Assembly assembly, IEnumerable<string> scripts)
    {
        string GetStringFromStream(Stream stream)
        {
            using var streamReader = new StreamReader(stream);
            var result = streamReader.ReadToEnd();
            return result;
        }

        foreach (var script in scripts)
        {
            var scriptContent = GetStringFromStream(assembly.GetManifestResourceStream(script));
            _repository.ExecuteScript(scriptContent);
            RecordScriptExecution();
        }

        UpdateHistory();
    }

    private IEnumerable<string> ExtractUnexecutedScripts(IEnumerable<string> scripts)
    {
        return scripts;
    }

    private void RecordScriptExecution()
    {

    }

    private void UpdateHistory()
    {

    }
}
