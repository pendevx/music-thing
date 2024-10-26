using Music.Repositories.Contracts;

namespace Music.QueryHandlers.Accounts;

public class ValidateTokenIsActiveHandler : IBaseQueryHandler<Guid, bool>
{
    private readonly ISessionRepository _sessionRepository;

    public ValidateTokenIsActiveHandler(ISessionRepository sessionRepository)
    {
        _sessionRepository = sessionRepository;
    }

    public bool Execute(Guid token)
    {
        return _sessionRepository.GetSessionByToken(token)?.ExpiresOn > DateTime.UtcNow;
    }
}
