using Music.Backend.DatabaseContexts;
using Music.Backend.Models;
using Music.Backend.Repositories.Contracts;

namespace Music.Backend.Repositories;

public class AccountRepository : GenericRepository<Account>, IAccountRepository
{
    public AccountRepository(MusicContext ctx) : base(ctx)
    {
    }
}
