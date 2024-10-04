using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Music.Backend.Controllers;
using Music.Backend.Services.Contracts;

namespace Music.Backend.Attributes;

public class RequiresAuthenticatedAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var authCookie = context.HttpContext.Request.Cookies[BaseController.AuthenticationCookieName];

        if (authCookie is null)
            context.Result = new UnauthorizedResult();

        var cookieGuid = Guid.Parse(authCookie!);
        var authenticationService = context.HttpContext.RequestServices.GetRequiredService<IAuthenticationService>();
        var isActiveSession = authenticationService.TokenIsActive(cookieGuid);

        if (!isActiveSession)
            context.Result = new UnauthorizedResult();

        context.HttpContext.Items[BaseController.AuthenticationCookieName] = cookieGuid;

        base.OnActionExecuting(context);
    }
}
