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
