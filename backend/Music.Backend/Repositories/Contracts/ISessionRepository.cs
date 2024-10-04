using Music.Backend.Models.Generated;

namespace Music.Backend.Repositories.Contracts;

public interface ISessionRepository : IGenericRepository<Session>
{
    Session? GetSessionByToken(Guid token);
    IQueryable<Session> GetExpiredSessions(int accountId);
    Account? GetAccountFromSession(Guid token);
}
