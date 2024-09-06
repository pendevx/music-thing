namespace Music.Backend.Middleware;

public class GlobalExceptionHandler
{
    private readonly RequestDelegate _next;

    public GlobalExceptionHandler(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (FileNotFoundException)
        {
            context.Response.StatusCode = 404;
            await context.Response.WriteAsync("The file does not exist.");
        }
        catch (Exception)
        {
            await context.Response.WriteAsync("An unhandled error occurred.");
        }
    }
}
