using Music.Backend.Models;
using Music.Backend.Models.DTO;

namespace Music.Backend.Repositories.Contracts;

public interface ISongRepository : IGenericRepository<Song>
{
    new StreamedAudio? GetById(int id);
}
