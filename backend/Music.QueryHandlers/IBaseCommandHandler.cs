namespace Music.QueryHandlers
{
    public interface IBaseQueryHandler<in TCommand, out TResult>
    {
        public TResult Execute(TCommand command);
    }

    public interface IBaseQueryHandler<in TCommand>
    {
        public void Execute(TCommand command);
    }
}
