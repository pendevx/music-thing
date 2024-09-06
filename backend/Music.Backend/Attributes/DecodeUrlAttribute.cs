using System.Web;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Music.Backend.Attributes;

public class DecodeUrlAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        foreach (var key in context.ActionArguments.Keys)
            context.ActionArguments[key] = HttpUtility.UrlDecode(context.ActionArguments[key] as string);

        base.OnActionExecuting(context);
    }
}
