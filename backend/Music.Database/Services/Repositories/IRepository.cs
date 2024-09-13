namespace Music.Database.Services.Repositories;

public interface IRepository
{
    T? ExecuteScalar<T>(string command) where T : class;
    int ExecuteScript(string command);
    void UseDatabase(string databaseName);
}
