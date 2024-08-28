using backend.DatabaseContexts;
using backend.Middleware;
using backend.Repositories;
using backend.Repositories.Contracts;
using backend.Services;
using backend.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace backend;

public class Program
{
    private static void RegisterDependencies(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IAudioService, AudioService>();
        builder.Services.AddScoped<ILyricsService, LyricsService>();
        builder.Services.AddScoped<ISongRepository, SongRepository>();
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
