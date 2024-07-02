import React from "react";
import { MusicContext } from "../contexts";
import { CircularSvg } from "./";
import { MusicShuffleSvg, MusicLoopSvg, MusicIconSvg } from "../icons";

const height = "h-[60%]";

function playBehaviourStyles(playBehaviour) {
    switch (playBehaviour) {
        case "shuffle":
            return "-translate-x-full";
        case "loop":
            return "translate-x-full";
        case null:
            return "translate-x-0";
        default:
            return "";
    }
}

export default function LoopShuffleControl() {
    const musicContext = React.useContext(MusicContext);

    function onPlayBehaviourChange(behaviour) {
        if (behaviour == null || musicContext.playBehaviour === behaviour) {
            musicContext.setPlayBehaviour(null);
        } else {
            musicContext.setPlayBehaviour(behaviour);
        }
    }

    return (
        <div className="hidden laptop:flex h-full items-center ml-2 relative z-10">
            <i className={`w-full ${height} absolute bg-[#585858] rounded-[1.5rem] -z-10`} />
            <i className={`absolute left-0 right-0 ${height} rounded-[50%] aspect-square bg-[#cea127] -z-10 transition-all duration-200 ml-auto mr-auto
                ${playBehaviourStyles(musicContext.playBehaviour)} `}/>

            <CircularSvg className={height} onClick={() => onPlayBehaviourChange("shuffle")}>
                <MusicShuffleSvg />
            </CircularSvg>

            <CircularSvg className={`${height} ${musicContext.isPlaying ? "" : "animation-paused"} animate-spin`} onClick={() => onPlayBehaviourChange(null)}>
                <MusicIconSvg />
            </CircularSvg>

            <CircularSvg className={height} onClick={() => onPlayBehaviourChange("loop")}>
                <MusicLoopSvg />
            </CircularSvg>
        </div>
    )
}
