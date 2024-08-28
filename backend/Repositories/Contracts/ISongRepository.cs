using backend.Models;
using backend.Models.DTO;

namespace backend.Repositories.Contracts;

public interface ISongRepository : IGenericRepository
{
    StreamedAudio GetById(int id);
    void Create(Song entity);
    void CreateMany(IEnumerable<Song> entities);
}
