using backend.Attributes;
using backend.DatabaseContexts;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

namespace backend.Middleware;

public class DbConnectionHandler
{
    private readonly RequestDelegate _next;

    public DbConnectionHandler(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext ctx)
    {
        // Reference: https://stackoverflow.com/a/70994676
        var attributeMetadata = ctx.Features.Get<IEndpointFeature>()?.Endpoint?.Metadata.GetMetadata<RequiresDbConnectionAttribute>();

        if (attributeMetadata == null)
        {
            await _next(ctx);
            return;
        }

        var entities = ctx.RequestServices.GetRequiredService<MusicContext>();
        await entities.Database.OpenConnectionAsync();
        await _next(ctx);
        await entities.Database.CloseConnectionAsync();
    }
}
