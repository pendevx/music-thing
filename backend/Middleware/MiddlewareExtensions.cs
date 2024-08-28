namespace backend.Middleware;

public static class MiddlewareExtensions
{
    public static void UseGlobalExceptionHandler(this IApplicationBuilder builder)
    {
        builder.UseMiddleware<GlobalExceptionHandler>();
    }

    public static void UseLogger(this IApplicationBuilder builder)
    {
        builder.UseMiddleware<MusicAppLogger>();
    }

    public static void UseDbConnectionHandler(this IApplicationBuilder builder)
    {
        builder.UseMiddleware<DbConnectionHandler>();
    }
}
