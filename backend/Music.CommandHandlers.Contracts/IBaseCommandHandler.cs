using Music.Commands;

namespace Music.CommandHandlers.Contracts
{
    public interface IBaseCommandHandler<in TCommand, out TResult> where TCommand : BaseCommand
    {
        public TResult Execute(TCommand command);
    }

    public interface IBaseCommandHandler<in TCommand> where TCommand : BaseCommand
    {
        public void Execute(TCommand command);
    }
}
