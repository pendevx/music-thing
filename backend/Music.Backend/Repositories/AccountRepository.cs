using Music.Backend.DatabaseContexts;
using Music.Backend.Models.Generated;
using Music.Backend.Repositories.Contracts;

namespace Music.Backend.Repositories;

public class AccountRepository : GenericRepository<Account>, IAccountRepository
{
    public AccountRepository(MusicContext ctx) : base(ctx)
    {
    }

    public Account? GetByUsername(string username)
    {
        var account = Entities.FirstOrDefault(a => a.Username == username);
        return account;
    }
}
