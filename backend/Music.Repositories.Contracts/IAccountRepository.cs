using Music.Repository.EF.Models.Generated;

namespace Music.Repositories.Contracts;

public interface IAccountRepository : IGenericRepository<Account>
{
    Account? GetByUsername(string username);
}
