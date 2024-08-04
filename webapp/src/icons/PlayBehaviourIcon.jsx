import { MusicLoopSvg, MusicShuffleSvg, MusicIconSvg } from ".";

export default function PlayBehaviourIcon({ playBehaviour, className }) {
    switch (playBehaviour) {
        case "loop":
            return <MusicLoopSvg className={className} />;

        case "shuffle":
            return <MusicShuffleSvg className={className} />;

        default:
            return <MusicIconSvg className={className} />;
    }
}
