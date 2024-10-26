using Music.Backend.Middleware;
using Microsoft.EntityFrameworkCore;
using Music.Backend.Services;
using Music.Backend.Services.Contracts;
using Music.Repositories;
using Music.Repositories.Contracts;
using Music.Repository.EF.DatabaseContexts;

namespace Music.Backend;

public static class DependencyInjectionConfiguration
{
    public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IAudioService, AudioService>();
        builder.Services.AddScoped<ILyricsService, LyricsService>();
        builder.Services.AddScoped<ISongRepository, SongRepository>();
        builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
        builder.Services.AddScoped<IAccountRepository, AccountRepository>();
        builder.Services.AddScoped<ISessionRepository, SessionRepository>();

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
        app.UseDbConnectionHandler();
        app.MapControllers();
        app.Run();
    }
}
