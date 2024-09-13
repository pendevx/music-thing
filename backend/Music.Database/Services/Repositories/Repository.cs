using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Music.Database.Services.Repositories;

public class Repository : IRepository
{
    private readonly SqlConnection _dbConnection;

    public Repository(IConfiguration configuration)
    {
        _dbConnection = new SqlConnection(configuration.GetConnectionString("music-thing"));
        _dbConnection.Open();
    }

    public T? ExecuteScalar<T>(string command) where T : class
    {
        var sqlCmd = new SqlCommand(command, _dbConnection);
        return sqlCmd.ExecuteScalar() as T;
    }

    public int ExecuteScript(string command)
    {
        var sqlCmd = new SqlCommand(command, _dbConnection);
        return sqlCmd.ExecuteNonQuery();
    }

    public void UseDatabase(string databaseName)
    {
        ExecuteScript($"USE {databaseName}");
    }

    ~Repository()
    {
        _dbConnection.Dispose();
        _dbConnection.Close();
    }
}
