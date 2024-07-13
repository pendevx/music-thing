using backend.Middleware;

namespace backend;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllOrigins", policy =>
            {
                policy.WithOrigins("*");
            });

            options.AddPolicy("DevelopmentLocalhost", policy =>
            {
                policy.WithOrigins("*");
            });
        });

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseCors("DevelopmentLocalhost");
        }
        else
        {
            app.UseCors("AllOrigins");
        }

        app.UseGlobalExceptionHandler();
        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}