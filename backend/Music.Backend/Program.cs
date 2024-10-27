using System.Reflection;
using FastEndpoints;
using FastEndpoints.Swagger;
using Music.Backend.Middleware;
using Microsoft.EntityFrameworkCore;
using Music.CommandHandlers;
using Music.CommandHandlers.Accounts;
using Music.QueryHandlers;
using Music.QueryHandlers.Accounts;
using Music.Repositories;
using Music.Repositories.Contracts;
using Music.Repository.EF.DatabaseContexts;

namespace Music.Backend;

public static class DependencyInjectionConfiguration
{
    public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<ISongRepository, SongRepository>();
        builder.Services.AddScoped<IAccountRepository, AccountRepository>();
        builder.Services.AddScoped<ISessionRepository, SessionRepository>();

        var commandHandlers = Assembly.GetAssembly(typeof(IBaseCommandHandler<>))?.GetTypes()
            .Where(t => t.IsClass) ?? [];

        var queryHandlers = Assembly.GetAssembly(typeof(IBaseQueryHandler<>))?.GetTypes()
            .Where(t => t.IsClass) ?? [];

        foreach (var handler in commandHandlers)
            builder.Services.AddScoped(handler);
        foreach (var handler in queryHandlers)
            builder.Services.AddScoped(handler);

        return builder;
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddLogging(logging => { logging.AddSeq(); });
        builder.Services.AddDbContext<MusicContext>(opt =>
        {
            var connectionString = builder.Configuration.GetConnectionString("music-thing");
            opt.UseSqlServer(connectionString);
        });

        builder.Services.AddFastEndpoints()
            .SwaggerDocument();

        builder.ConfigureServices();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseGlobalExceptionHandler();
        app.UseLogger();
        app.UseAuthorization();
        app.MapControllers();
        app.UseFastEndpoints()
            .UseSwaggerGen();
        app.Run();
    }
}
