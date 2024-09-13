using System.Reflection;
using Music.Database.Services.Contracts;

namespace Music.Database.Services;

public class VersioningService : IVersioningService
{
    public void Setup(string databaseName)
    {
        throw new NotImplementedException();
    }

    public void UpdateSchema(Assembly assembly, IEnumerable<string> updateScripts)
    {
        throw new NotImplementedException();
    }
}
