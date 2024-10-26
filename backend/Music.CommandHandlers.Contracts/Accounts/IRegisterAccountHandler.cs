using Music.Commands.Accounts;

namespace Music.CommandHandlers.Contracts.Accounts
{
    public interface IRegisterAccountHandler : IBaseCommandHandler<RegisterAccountCommand, bool>
    {

    }
}
