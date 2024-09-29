namespace Music.Backend.Models.DTO;

public class UserRegistrationInfo
{
    public UserRegistrationInfo(string displayName, string username, string password)
    {
        DisplayName = displayName;
        Username = username;
        Password = password;
    }

    public string DisplayName { get; }
    public string Username { get; }
    public string Password { get; }
}
