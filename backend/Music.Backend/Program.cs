using Music.Backend.Middleware;
using Microsoft.EntityFrameworkCore;
using Music.Backend.Services;
using Music.Backend.Services.Contracts;
using Music.EF.DatabaseContexts;
using Music.Repositories;
using Music.Repositories.Contracts;

namespace Music.Backend;

public class Program
{
    private static void RegisterDependencies(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IAudioService, AudioService>();
        builder.Services.AddScoped<ILyricsService, LyricsService>();
        builder.Services.AddScoped<ISongRepository, SongRepository>();
        builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
        builder.Services.AddScoped<IAccountRepository, AccountRepository>();
        builder.Services.AddScoped<ISessionRepository, SessionRepository>();
    }

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

        RegisterDependencies(builder);

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
