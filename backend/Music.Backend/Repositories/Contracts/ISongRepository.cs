using Music.Backend.Models.DTO;
using Music.Backend.Models.Generated;

namespace Music.Backend.Repositories.Contracts;

public interface ISongRepository : IGenericRepository<Song>
{
    new StreamedAudio? GetById(int id);
}
