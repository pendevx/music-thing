using backend.Models;
using backend.Models.DTO;

namespace backend.Repositories.Contracts;

public interface ISongRepository : IGenericRepository<Song>
{
    new StreamedAudio? GetById(int id);
}
