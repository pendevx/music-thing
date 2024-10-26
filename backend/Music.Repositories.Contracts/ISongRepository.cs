using Music.Repository.EF.Models.Generated;
using Music.Repository.EF.Models.Utils;

namespace Music.Repositories.Contracts;

public interface ISongRepository : IGenericRepository<Song>
{
    new StreamedAudio? GetById(int id);
}
