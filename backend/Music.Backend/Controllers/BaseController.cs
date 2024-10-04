using Microsoft.AspNetCore.Mvc;

namespace Music.Backend.Controllers;

[ApiController]
public class BaseController : ControllerBase
{
    public const string AuthenticationCookieName = "Authorization";

    protected Guid AuthenticationCookie
    {
        get
        {
            var cookie = Request.Cookies[AuthenticationCookieName];
            return cookie is null ? Guid.Empty : Guid.Parse(cookie);
        }
        set
        {
            if (value == Guid.Empty)
            {
                Response.Cookies.Delete(AuthenticationCookieName);
            }
            else
            {
                Response.Cookies.Append(AuthenticationCookieName, value.ToString(), new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    MaxAge = TimeSpan.FromDays(7)
                });
            }
        }
    }
}
