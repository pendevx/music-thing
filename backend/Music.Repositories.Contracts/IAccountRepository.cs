using Music.Database.Entities;

namespace Music.Repositories.Contracts;

public interface IAccountRepository : IGenericRepository<Account>
{
    Account? GetByUsername(string username);
}
