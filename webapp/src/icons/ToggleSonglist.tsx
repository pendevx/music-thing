import { SongList } from ".";

type ToggleSonglistProps = {
    className?: string;
    onClick?: () => void;
};

export default function ToggleSonglist({ className, onClick }: ToggleSonglistProps) {
    return (
        <div className={`flex h-12 w-12 items-center justify-center bg-[#0f0f0f] transition-all duration-1000 laptop:h-8 laptop:w-8 ${className}`} onClick={onClick}>
            <SongList />
        </div>
    );
}
