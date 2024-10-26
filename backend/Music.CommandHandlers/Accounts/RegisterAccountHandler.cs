using System.Security.Cryptography;
using System.Text;
using Music.Commands.Accounts;
using Music.Repositories.Contracts;
using Music.Repository.EF.Models.Generated;

namespace Music.CommandHandlers.Accounts;

public class RegisterAccountHandler : IBaseCommandHandler<RegisterAccountCommand, bool>
{
    private readonly IAccountRepository _accountRepository;

    public RegisterAccountHandler(IAccountRepository accountRepository)
    {
        _accountRepository = accountRepository;
    }

    private static byte[] GenerateSaltedHash(byte[] raw, byte[] salt)
    {
        var salted = raw.Concat(salt).ToArray();
        return SHA256.HashData(salted);
    }

    public bool Execute(RegisterAccountCommand command)
    {
        var existingAccount = _accountRepository.GetByUsername(command.Username);

        if (!(existingAccount is null))
            return false;

        var newGuid = Guid.NewGuid();
        var saltedPassword = GenerateSaltedHash(Encoding.UTF8.GetBytes(command.Password), newGuid.ToByteArray());

        _accountRepository.Create(new Account
        {
            Guid = newGuid,
            Username = command.Username,
            SaltedPassword = saltedPassword,
            DisplayName = command.DisplayName
        });

        return true;
    }
}
