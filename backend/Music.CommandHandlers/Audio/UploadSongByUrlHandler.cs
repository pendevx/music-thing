using System.Security.Authentication;
using Music.Commands.Audio;
using Music.Global.Contracts;
using Music.Repository.EF.DatabaseContexts;
using Music.Repository.EF.Models.Generated;

namespace Music.CommandHandlers.Audio;

public class UploadSongByUrlHandler : IBaseCommandHandler<UploadSongByUrlCommand>
{
    private readonly MusicContext _dbContext;
    private readonly IAuthContext _authContext;

    public UploadSongByUrlHandler(MusicContext dbContext, IAuthContext authContext)
    {
        _dbContext = dbContext;
        _authContext = authContext;
    }

    public void Execute(UploadSongByUrlCommand command)
    {
        var account = _authContext.GetAccount();

        if (account is null)
            throw new AuthenticationException("no.");

        _dbContext.SongRequests.Add(new SongRequest
        {
            Name = command.Title,
            UploaderAccountId = account.Id,
            RequestStatusEnum = RequestStatus.Pending,
            Source = command.Source,
            SourceUrl = command.Url,
        });

        _dbContext.SaveChanges();
    }
}
