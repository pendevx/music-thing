using Microsoft.EntityFrameworkCore;
using Music.Backend.DatabaseContexts;
using Music.Backend.Models.Generated;
using Music.Backend.Repositories.Contracts;

namespace Music.Backend.Repositories;

public class SessionRepository : GenericRepository<Session>, ISessionRepository
{
    public SessionRepository(MusicContext ctx) : base(ctx)
    {
    }

    public Session? GetSessionByToken(Guid token)
    {
        return Entities.FirstOrDefault(s => s.Token == token);
    }

    public IQueryable<Session> GetExpiredSessions(int accountId)
    {
        return Entities.Where(a => a.Id == accountId && a.ExpiresOn > DateTime.UtcNow);
    }

    public Account? GetAccountFromSession(Guid token)
    {
        return Entities.Where(s => s.Token == token && s.ExpiresOn > DateTime.UtcNow)
            .Include(s => s.Account)
            .FirstOrDefault()?
            .Account;
    }
}
