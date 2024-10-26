using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Music.Repository.EF.DatabaseContexts;

namespace Music.Backend.EndpointProcessors.PostProcessors;

public class CloseDbConnection<TReq, TRes> : IPostProcessor<TReq, TRes>
{
    public async Task PostProcessAsync(IPostProcessorContext<TReq, TRes> context, CancellationToken ct)
    {
        var musicContext = context.HttpContext.Resolve<MusicContext>();
        await musicContext.Database.CloseConnectionAsync();
    }
}
