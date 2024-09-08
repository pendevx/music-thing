using System.Reflection;
using Music.Database.Services.Contracts;

namespace Music.Database.Services;

public class DatabaseSchemaManager : IDatabaseSchemaManager
{
    public DatabaseSchemaManager()
    {

    }

    public void Run()
    {
        var thisAssembly = Assembly.GetExecutingAssembly();
        var embeddedResources = thisAssembly.GetManifestResourceNames();
        Array.Sort(embeddedResources);

        foreach (var resource in embeddedResources)
        {
            Console.WriteLine(resource);
            // var content = thisAssembly.GetManifestResourceStream(resource);
            // if (content is null) return;
            // var stdout = Console.OpenStandardOutput();
            // content.CopyTo(stdout);
        }
    }
}
