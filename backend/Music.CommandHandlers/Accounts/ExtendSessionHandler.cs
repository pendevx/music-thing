using Music.Commands.Accounts;
using Music.Repositories.Contracts;

namespace Music.CommandHandlers.Accounts;

public class ExtendSessionHandler : IBaseCommandHandler<ExtendSessionCommand, bool>
{
    private readonly ISessionRepository _sessionRepository;

    public ExtendSessionHandler(ISessionRepository sessionRepository)
    {
        _sessionRepository = sessionRepository;
    }

    public bool Execute(ExtendSessionCommand command)
    {
        var session = _sessionRepository.GetSessionByToken(command.Token);

        if (session is null)
            return false;

        session.ExpiresOn = DateTime.UtcNow.AddSeconds(command.ExtensionSeconds);
        _sessionRepository.MusicContext.SaveChanges();

        return true;
    }
}
