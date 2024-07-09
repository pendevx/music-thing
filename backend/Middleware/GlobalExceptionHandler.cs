namespace backend.Middleware;

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
        catch (FileNotFoundException e)
        {
            // log e
            await context.Response.WriteAsJsonAsync(new
            {
                 StatusCode = 404,
                 Message = $"Invalid key ${e.FileName}: The file ${e.FileName} was not found."
            });
        }
    }
}
