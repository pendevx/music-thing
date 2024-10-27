using FastEndpoints;
using FastEndpoints.Swagger;
using Music.Backend.Middleware;
using Microsoft.EntityFrameworkCore;
using Music.Backend.Services;
using Music.Backend.Services.Contracts;
using Music.CommandHandlers.Accounts;
using Music.QueryHandlers.Accounts;
using Music.Repositories;
using Music.Repositories.Contracts;
using Music.Repository.EF.DatabaseContexts;

namespace Music.Backend;

public static class DependencyInjectionConfiguration
{
    public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<ILyricsService, LyricsService>();
        builder.Services.AddScoped<ISongRepository, SongRepository>();
        builder.Services.AddScoped<IAccountRepository, AccountRepository>();
        builder.Services.AddScoped<ISessionRepository, SessionRepository>();

        builder.Services.AddScoped<LogoutHandler>();
        builder.Services.AddScoped<LoginHandler>();
        builder.Services.AddScoped<RegisterAccountHandler>();
        builder.Services.AddScoped<GetAccountByUsernameHandler>();
        builder.Services.AddScoped<ValidateTokenIsActiveHandler>();

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
