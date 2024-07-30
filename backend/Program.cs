using backend.Middleware;
using backend.Services;
using backend.Services.Contracts;

namespace backend;

public class Program
{
    private static void RegisterDependencies(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IMusicService, MusicService>();
        builder.Services.AddScoped<ILyricsService, LyricsService>();
    }

    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddLogging(logging => { logging.AddSeq(); });

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
        app.MapControllers();
        app.Run();
    }
}
