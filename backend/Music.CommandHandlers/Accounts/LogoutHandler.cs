using Music.Repositories.Contracts;

namespace Music.CommandHandlers.Accounts;

public class LogoutHandler : IBaseCommandHandler<Guid>
{
    private readonly ISessionRepository _sessionRepository;

    public LogoutHandler(ISessionRepository sessionRepository)
    {
        _sessionRepository = sessionRepository;
    }

    public void Execute(Guid token)
    {
        var session = _sessionRepository.GetSessionByToken(token);

        if (session is not null)
            _sessionRepository.Delete(session);
    }
}
