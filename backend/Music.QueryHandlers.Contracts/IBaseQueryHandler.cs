using Music.Queries;

namespace Music.QueryHandlers.Contracts
{
    public interface IBaseQueryHandler<in TCommand, out TResult> where TCommand : BaseQuery
    {
        public TResult Execute(TCommand command);
    }

    public interface IBaseQueryHandler<in TCommand> where TCommand : BaseQuery
    {
        public void Execute(TCommand command);
    }
}
