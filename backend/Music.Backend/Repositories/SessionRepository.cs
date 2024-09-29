using Music.Backend.DatabaseContexts;
using Music.Backend.Models.Generated;
using Music.Backend.Repositories.Contracts;

namespace Music.Backend.Repositories;

public class SessionRepository : GenericRepository<Session>, ISessionRepository
{
    public SessionRepository(MusicContext ctx) : base(ctx)
    {
    }
}