using Music.Repositories.Contracts;
using Music.Repository.EF.Models.Generated;

namespace Music.QueryHandlers.Accounts;

public class GetAccountByUsernameHandler : IBaseQueryHandler<string, Account?>
{
    private readonly IAccountRepository _accountRepository;

    public GetAccountByUsernameHandler(IAccountRepository accountRepository)
    {
        _accountRepository = accountRepository;
    }

    public Account? Execute(string username)
    {
        return _accountRepository.GetByUsername(username);
    }
}
