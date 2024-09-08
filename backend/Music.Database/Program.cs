using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace Music.Database;

class Program
{
    static void Main(string[] args)
    {
        var serviceCollection = new ServiceCollection();

        var thisAssembly = Assembly.GetExecutingAssembly();
        var embeddedResources = thisAssembly.GetManifestResourceNames();

        foreach (var resource in embeddedResources)
        {
            Console.WriteLine(resource);

            var content = thisAssembly.GetManifestResourceStream(resource);
            if (content is null) return;

            var stdout = Console.OpenStandardOutput();
            content.CopyTo(stdout);
        }
    }
}

/*
 * database:
 *  store what scripts have been run
 *  store what time the last update occurred
 *
 * updater:
 *  grab last update time
 *  binary search through file system to find the first script which hasn't run BASED ON 'created on' // WONT WORK: if re-clone repository, 'created on' is changed!
 *  validate those scripts haven't been run yet
 *  run the scripts
 */
