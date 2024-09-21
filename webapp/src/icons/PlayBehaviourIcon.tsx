import { MusicLoopSvg, MusicShuffleSvg, MusicIconSvg } from ".";
import { PlayBehaviour } from "../types/playBehaviour";

type PlayBehaviourIconProps = {
    playBehaviour: PlayBehaviour;
    className?: string;
};

export default function PlayBehaviourIcon({ playBehaviour, className }: PlayBehaviourIconProps) {
    let icon;

    switch (playBehaviour) {
        case "loop":
            icon = <MusicLoopSvg className={className} />;
            break;

        case "shuffle":
            icon = <MusicShuffleSvg className={className} />;
            break;

        default:
            icon = <MusicIconSvg className={className} />;
            break;
    }

    return <div className="h-full">{icon}</div>;
}
