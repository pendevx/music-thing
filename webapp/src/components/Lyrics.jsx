export default function Lyrics({ lyrics }) {
    return (
        <p>
            {lyrics.map((line, i) => (
                <p key={i} className="mb-5">
                    {line}
                </p>
            ))}
        </p>
    );
}
