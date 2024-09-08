namespace Music.Database.Services.Repositories;

public interface IRepository
{
    T ExecuteScalar<T>(string command) where T : class;
}
