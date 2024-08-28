using backend.Models;

namespace backend.Repositories.Contracts;

public interface ISongRepository : IGenericRepository
{
    StreamedAudio GetById(int id);
}
