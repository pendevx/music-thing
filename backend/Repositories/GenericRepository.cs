using System.Data.Common;
using backend.DatabaseContexts;
using backend.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : Entity
{
    protected readonly MusicContext MusicContext;
    protected readonly DbSet<T> Entities;

    public GenericRepository(MusicContext ctx)
    {
        MusicContext = ctx;
        Entities = ctx.Set<T>();
    }
    
    public TQueryResult? ExecuteScalar<TQueryResult>(string commandText, DbTransaction? transaction = null) where TQueryResult : class
    {
        var connection = MusicContext.Database.GetDbConnection();

        transaction ??= connection.BeginTransaction();
        
        var command = connection.CreateCommand();
        command.CommandText = commandText;
        command.Transaction = transaction;

        var results = command.ExecuteScalar();
        
        return results as TQueryResult;
    }

    public DbTransaction BeginTransaction()
    {
        return MusicContext.Database.GetDbConnection().BeginTransaction();
    }

    public T? GetById(int id)
    {
        return Entities.FirstOrDefault(e => e.Id == id);
    }

    public void Create(IEnumerable<T> entities)
    {
        Entities.AddRange(entities);
        MusicContext.SaveChanges();
    }
    
    public void Create(T entity)
    {
        Create(new[] { entity });
    }

    public TMapped? GetById<TMapped>(int id, Func<T, TMapped> mapper) where TMapped : Entity
    {
        return Entities.Where(e => e.Id == id)
            .Select(x => mapper(x))
            .FirstOrDefault();
    }
}
