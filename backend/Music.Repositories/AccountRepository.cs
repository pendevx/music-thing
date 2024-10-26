using Music.Repositories.Contracts;
using Music.Repository.EF.DatabaseContexts;
using Music.Repository.EF.Models.Generated;

namespace Music.Repositories;

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
