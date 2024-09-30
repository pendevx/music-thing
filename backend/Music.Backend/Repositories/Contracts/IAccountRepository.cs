using Music.Backend.Models.Generated;

namespace Music.Backend.Repositories.Contracts;

public interface IAccountRepository : IGenericRepository<Account>
{
    Account? GetByUsername(string username);
}
