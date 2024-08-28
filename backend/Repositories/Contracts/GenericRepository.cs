using System.Data.Common;
using backend.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Contracts;

public class GenericRepository : IGenericRepository
{
    protected readonly MusicContext MusicContext;

    public GenericRepository(MusicContext ctx)
    {
        MusicContext = ctx;
    }
    
    public T? ExecuteScalar<T>(string commandText, DbTransaction? transaction = null) where T : class
    {
        var connection = MusicContext.Database.GetDbConnection();

        transaction ??= connection.BeginTransaction();
        
        var command = connection.CreateCommand();
        command.CommandText = commandText;
        command.Transaction = transaction;

        var results = command.ExecuteScalar();
        
        return results as T;
    }

    public DbTransaction BeginTransaction()
    {
        return MusicContext.Database.GetDbConnection().BeginTransaction();
    }

    public T GetById<T>(int id)
    {
        throw new NotImplementedException();
    }
}
