namespace Music.Backend.Models.DTO.HttpRequests;

public class UserInformation
{
    public UserInformation(string displayName)
    {
        DisplayName = displayName;
    }

    public string DisplayName { get; }
}
