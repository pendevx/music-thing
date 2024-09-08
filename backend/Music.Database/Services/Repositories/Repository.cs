using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Music.Database.Services.Repositories;

public class Repository : IRepository
{
    private readonly SqlConnection _dbConnection;

    public Repository(IConfiguration configuration)
    {
        _dbConnection = new SqlConnection(configuration.GetConnectionString("music-thing"));
    }

    public T ExecuteScalar<T>(string command) where T : class
    {
        throw new NotImplementedException();
    }

    ~Repository()
    {
        _dbConnection.Dispose();
        _dbConnection.Close();
    }
}
