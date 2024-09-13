using System.Reflection;

namespace Music.Database.Services.Contracts;

public interface IVersioningService
{
    void Setup(string databaseName);
    void UpdateSchema(Assembly assembly, IEnumerable<string> updateScripts);
}
