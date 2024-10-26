using Music.Repository.EF.Models.Generated;

namespace Music.Repositories.Contracts;

public interface ISessionRepository : IGenericRepository<Session>
{
    Session? GetSessionByToken(Guid token);
    IQueryable<Session> GetExpiredSessions(int accountId);
    Account? GetAccountFromSession(Guid token);
}
