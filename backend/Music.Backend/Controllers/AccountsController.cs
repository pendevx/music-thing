// using Microsoft.AspNetCore.Mvc;
// using Music.Backend.Attributes;
// using Music.Backend.Models.DTO.Http;
// using Music.Backend.Services.Contracts;
//
// namespace Music.Backend.Controllers;
//
// [ApiController]
// [Route("accounts")]
// public class AccountsController : BaseController
// {
//     private readonly IAuthenticationService _authenticationService;
//
//     public AccountsController(IAuthenticationService authenticationService)
//     {
//         _authenticationService = authenticationService;
//     }
//
//     // [HttpPost]
//     // [Route("register")]
//     // public ActionResult<UserInformation> Register(UserRegistrationInfo userInformation)
//     // {
//     //     var successfullyRegistered = _authenticationService.Register(
//     //         userInformation.Username,
//     //         userInformation.Password,
//     //         userInformation.DisplayName);
//     //
//     //     if (!successfullyRegistered)
//     //     {
//     //         Response.StatusCode = 409;
//     //         return null!;
//     //     }
//     //
//     //     return Login(new UserLoginInfo(userInformation.Username, userInformation.Password));
//     // }
//
//     // [HttpPost]
//     // [Route("login")]
//     // public ActionResult<UserInformation> Login(UserLoginInfo credentials)
//     // {
//     //     var newAuthCookie = _authenticationService.Login(credentials.Username, credentials.Password);
//     //     AuthenticationCookie = newAuthCookie;
//     //
//     //     var account = _authenticationService.GetByUsername(credentials.Username)!;
//     //
//     //     return new UserInformation
//     //     {
//     //         DisplayName = account.DisplayName
//     //     };
//     // }
//
//     // [HttpPost]
//     // [Route("logout")]
//     // [RequiresAuthenticated]
//     // public void Logout()
//     // {
//     //     _authenticationService.Logout(AuthenticationCookie);
//     //     AuthenticationCookie = Guid.Empty;
//     // }
//
//     [HttpGet]
//     [Route("user")]
//     [RequiresAuthenticated]
//     public ActionResult<UserInformation> GetUserInformation()
//     {
//         var account = _authenticationService.GetByToken(AuthenticationCookie)!;
//
//         return new UserInformation
//         {
//             DisplayName = account.DisplayName
//         };
//     }
//
//     [HttpPost]
//     [Route("extendsession")]
//     [RequiresAuthenticated]
//     public void ExtendSession()
//     {
//         // store it so we can re-set the token to the same value after, but with a new max-age
//         var cookieGuid = AuthenticationCookie;
//
//         _authenticationService.ExtendSession(AuthenticationCookie, (int)TimeSpan.FromDays(7).TotalSeconds);
//         AuthenticationCookie = cookieGuid;
//     }
// }
