using Music.Repository.EF.Models.Generated;

namespace Music.Global.Contracts;

public interface IAuthContext
{
    Account? GetAccount();
}
