using System.Data.Common;

namespace backend.Repositories.Contracts;

public interface IGenericRepository
{
    /**
     * Requires an active connection with the database.
     */
    T? ExecuteScalar<T>(string command, DbTransaction? transaction = null) where T : class;
    /**
     * Requires an active connection with the database.
     */
    DbTransaction BeginTransaction();
    T GetById<T>(int id);
}
