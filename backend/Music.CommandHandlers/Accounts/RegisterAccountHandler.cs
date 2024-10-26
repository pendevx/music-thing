using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Music.CommandHandlers.Contracts.Accounts;
using Music.Commands.Accounts;

namespace Music.CommandHandlers.Accounts
{
    public class RegisterAccountHandler : IRegisterAccountHandler
    {
        private readonly IAccountRepository _accountRepository;

        public RegisterAccountHandler()
        {

        }

        private static byte[] GenerateSaltedHash(byte[] raw, byte[] salt)
        {
            var salted = raw.Concat(salt).ToArray();
            return SHA256.Create().ComputeHash(salted);
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
                Username = username,
                SaltedPassword = saltedPassword,
                DisplayName = displayName
            });

            return true;
        }
    }
}
