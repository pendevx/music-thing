namespace Music.Backend.Utils;

public class LazyLoad<T>
{
    private T? _value;
    private readonly Func<T> _loader;

    public LazyLoad(Func<T> loader)
    {
        _loader = loader;
    }

    public T Value
    {
        get
        {
            if (_value is null)
            {
                _value = _loader();
            }

            return _value;
        }
        set => _value = value;
    }
}

public static class LazyLoad
{
    public static LazyLoad<T> Create<T>(Func<T> loader)
    {
        return new LazyLoad<T>(loader);
    }
}
