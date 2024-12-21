using Music.Repository.EF.DatabaseContexts;

namespace Music.Services.Validators;

public class ValidatePermissionService
{
    private readonly MusicContext _dbContext;

    public ValidatePermissionService(MusicContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void
}
