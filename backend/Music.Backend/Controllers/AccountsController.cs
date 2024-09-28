using Microsoft.AspNetCore.Mvc;
using Music.Backend.Models.DTO;
using Music.Backend.Services.Contracts;

namespace Music.Backend.Controllers;

[ApiController]
[Route("accounts")]
public class AccountsController : ControllerBase
{
    private const string AuthorizationCookie = "Authorization";

    private readonly IAuthenticationService _authenticationService;

    public AccountsController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost]
    [Route("register")]
    public void RegisterUser(UserRegistrationInfo userInformation)
    {
        var successfullyRegistered = _authenticationService.Register(
            userInformation.Username,
            userInformation.Password,
            userInformation.DisplayName);

        if (!successfullyRegistered)
        {
            Response.StatusCode = 409;
            return;
        }

        Login(userInformation.Username, userInformation.Password);
    }

    [HttpPost]
    [Route("login")]
    public void Login(string username, string password)
    {
        var authCookie = _authenticationService.Login(username, password);
        Response.Cookies.Append(AuthorizationCookie, authCookie, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict
        });
    }
}
