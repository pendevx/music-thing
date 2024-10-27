using FastEndpoints;
using Music.Backend.EndpointFilters;
using Music.Backend.HttpContextExtensions;
using Music.Backend.Models.DTO.Http;
using Music.QueryHandlers.Accounts;

namespace Music.Backend.Endpoints.Accounts;

public class GetUserInformationEndpoint : Ep.NoReq.Res<UserInformation>
{
    private readonly GetAccountBySessionIDHandler _getUserBySessionId;

    public GetUserInformationEndpoint(GetAccountBySessionIDHandler getUserBySessionId)
    {
        _getUserBySessionId = getUserBySessionId;
    }

    public override void Configure()
    {
        Get("/accounts/user");
        AllowAnonymous();
        Options(x => x.AddEndpointFilter<RequiresAuthenticatedFilter>());
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var token = HttpContext.Request.GetAuthenticationCookie();

        var account = _getUserBySessionId.Execute(token)!;

        await SendAsync(new UserInformation
        {
            DisplayName = account.DisplayName
        }, cancellation: ct);
    }
}
