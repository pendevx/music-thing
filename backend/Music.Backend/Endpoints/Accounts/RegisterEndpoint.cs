using FastEndpoints;
using Microsoft.AspNetCore.Authorization;
using Music.Backend.Models.DTO.Http;
using Music.CommandHandlers.Contracts.Accounts;
using Music.Commands.Accounts;

namespace Music.Backend.Endpoints.Accounts;

[HttpPost("/accounts/register")]
[AllowAnonymous]
public class RegisterEndpoint : Endpoint<UserRegistrationInfo, UserInformation>
{
    private readonly IRegisterAccountHandler _registerAccountHandler;

    public RegisterEndpoint(
        IRegisterAccountHandler registerAccountHandler)
    {
        _registerAccountHandler = registerAccountHandler;
    }

    public override async Task HandleAsync(UserRegistrationInfo req, CancellationToken ct)
    {
        var successfullyRegistered = _registerAccountHandler.Execute(
            new RegisterAccountCommand(req.Username,req.Password,req.DisplayName));

        if (!successfullyRegistered)
        {
            await SendAsync(null!, 409, ct);
            return;
        }

        return Login(new UserLoginInfo(req.Username, req.Password));
    }
}
