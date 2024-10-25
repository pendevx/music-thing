using Music.Database.Entities;

namespace Music.Repositories.Contracts;

public interface ISongRepository : IGenericRepository<Song>
{
    new StreamedAudio? GetById(int id);
}
