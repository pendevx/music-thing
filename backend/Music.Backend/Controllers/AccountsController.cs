using Microsoft.AspNetCore.Mvc;
using Music.Backend.Models.DTO.HttpRequests;
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
    public ActionResult<UserInformation> Register(UserRegistrationInfo userInformation)
    {
        var successfullyRegistered = _authenticationService.Register(
            userInformation.Username,
            userInformation.Password,
            userInformation.DisplayName);

        if (!successfullyRegistered)
        {
            Response.StatusCode = 409;
            return null!;
        }

        return Login(new UserLoginInfo(userInformation.Username, userInformation.Password));
    }

    [HttpPost]
    [Route("login")]
    public ActionResult<UserInformation> Login(UserLoginInfo credentials)
    {
        var authorizationCookie = Request.Cookies[AuthorizationCookie];

        if (authorizationCookie is not null)
        {
            var isActive = _authenticationService.TokenIsActive(Guid.Parse(authorizationCookie));
            if (isActive) return null!;
        }

        var newAuthCookie = _authenticationService.Login(credentials.Username, credentials.Password);
        Response.Cookies.Append(AuthorizationCookie, newAuthCookie, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            MaxAge = TimeSpan.FromDays(7)
        });

        var account = _authenticationService.GetByUsername(credentials.Username);

        if (account is null)
            return BadRequest();

        return new UserInformation(account.DisplayName);
    }

    [HttpPost]
    [Route("logout")]
    public void Logout()
    {
        var authorizationCookie = Request.Cookies[AuthorizationCookie];

        if (authorizationCookie is null)
            return;

        _authenticationService.Logout(Guid.Parse(authorizationCookie));

        Response.Cookies.Delete(AuthorizationCookie);
    }

    [HttpGet]
    [Route("user")]
    public ActionResult<UserInformation> GetUserInformation()
    {
        var authorizationCookie = Request.Cookies[AuthorizationCookie];

        if (authorizationCookie is null)
            return Unauthorized();

        var account = _authenticationService.GetByToken(Guid.Parse(authorizationCookie));

        if (account is null)
            return Unauthorized();

        return new UserInformation(account.DisplayName);
    }
}
