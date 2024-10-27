using Music.Repositories.Contracts;
using Music.Repository.EF.Models.Generated;

namespace Music.QueryHandlers.Accounts;

public class GetAccountBySessionIDHandler : IBaseQueryHandler<Guid, Account?>
{
    private readonly ISessionRepository _sessionRepository;

    public GetAccountBySessionIDHandler(ISessionRepository sessionRepository)
    {
        _sessionRepository = sessionRepository;
    }

    public Account? Execute(Guid token)
    {
        return _sessionRepository.GetAccountFromSession(token);
    }
}
