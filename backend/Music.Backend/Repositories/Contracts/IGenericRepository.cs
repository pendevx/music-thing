using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using Music.Backend.DatabaseContexts;

namespace Music.Backend.Repositories.Contracts;

public interface IGenericRepository<T> where T : class
{
    MusicContext MusicContext { get; }
    DbSet<T> Entities { get; }

    /**
     * Requires an active connection with the database.
     */
    TQueryResult? ExecuteScalar<TQueryResult>(string command, DbTransaction? transaction = null) where TQueryResult : class;
    /**
     * Requires an active connection with the database.
     */
    DbTransaction BeginTransaction();
    T? GetById(int id);
    TMapped? GetById<TMapped>(int id, Func<T, TMapped> mapper) where TMapped : Entity;
    void Create(T entity);
    void Create(IEnumerable<T> entities);
}
