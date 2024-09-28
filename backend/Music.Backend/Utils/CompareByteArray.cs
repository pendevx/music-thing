namespace Music.Backend.Utils;

public static class CompareByteArray
{
    public static bool IsEqual(this byte[] original, byte[] other)
    {
        if (original.Length != other.Length)
            return false;

        return !original.Where((t, i) => t != other[i]).Any();
    }
}
