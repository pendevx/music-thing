namespace Music.QueryHandlers
{
    public interface IBaseQueryHandler<in TQuery, out TResult>
    {
        public TResult Execute(TQuery command);
    }

    public interface IBaseQueryHandler<in TQuery>
    {
        public void Execute(TQuery command);
    }
}
