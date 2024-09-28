using Music.Backend.Repositories;

namespace Music.Backend.Models;

public class Session : Entity
{
    public Account Account { get; set; }

    public DateTime ExpiresOn { get; set; }
}
