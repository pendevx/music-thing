using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Music.Database.Services;
using Music.Database.Services.Contracts;
using Music.Database.Services.Repositories;

namespace Music.Database;

class Program
{
    static IServiceProvider ConfigureServices()
    {
        IServiceCollection services = new ServiceCollection();

        IConfiguration configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", false)
            .Build();

        services.AddSingleton(configuration);
        services.AddSingleton<IDatabaseSchemaManager, DatabaseSchemaManager>();
        services.AddSingleton<IRepository, Repository>();

        return services.BuildServiceProvider();
    }

    static void Main(string[] args)
    {
        var services = ConfigureServices();

        var entry = services.GetRequiredService<IDatabaseSchemaManager>();
        entry.Run();
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
