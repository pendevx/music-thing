namespace backend.Middleware;

public static class MiddlewareExtensions
{
    public static void UseGlobalExceptionHandler(this IApplicationBuilder builder)
    {
        builder.UseMiddleware<GlobalExceptionHandler>();
    }
}
