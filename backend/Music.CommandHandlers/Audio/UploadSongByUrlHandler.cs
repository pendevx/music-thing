using Music.Commands.Audio;
using Music.Repository.EF.DatabaseContexts;
using Music.Repository.EF.Models.Generated;

namespace Music.CommandHandlers.Audio;

public class UploadSongByUrlHandler : IBaseCommandHandler<UploadSongByUrlCommand>
{
    private readonly MusicContext _dbContext;

    public UploadSongByUrlHandler(MusicContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void Execute(UploadSongByUrlCommand command)
    {
        _dbContext.SongRequests.Add(new SongRequest
        {
            Name = command.Title,
            UploaderAccountId = command.AccountId,
            RequestStatusEnum = RequestStatus.Pending,
            Source = command.Source,
            SourceUrl = command.Url,
        });

        _dbContext.SaveChanges();
    }
}
