export default function MusicItem({ item, onClick, playing }) {
    return (
        <div className="cursor-pointer" onClick={() => onClick(item.key)}>
            <a className={`block pt-2 pb-2 pl-4 bg-[#363636] hover:bg-[#5e5e5e] transition-colors duration-200 ${playing ? "bg-[#5e5e5e] text-[#f2b200]" : ""}`}
                key={item.key}
            >
                {/\/(?<filename>.*)\.mp3/gi.exec(item.key)?.groups?.filename}
            </a>
        </div>
    );
}
