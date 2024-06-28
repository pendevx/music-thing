import { MusicIconSvg, MusicLoopSvg, MusicShuffleSvg } from "./icons";
import { MusicPlayerControl, MusicItem, CircularSvg } from "./components";
import React from "react";
import { MusicContext } from "./contexts/MusicContext";

export default function App() {
    const musicContext = React.useContext(MusicContext);

    function onSongSelect(index) {
        musicContext.chooseSong(index);
    }

    function onPlayBehaviourChange(behaviour) {
        musicContext.setPlayBehaviour(behaviour === musicContext.playBehaviour ? null : behaviour);
    }

    return (
        <div className="font-sans">
            <div className="w-[min(600px,70vw)] ml-auto mr-auto mb-8">
                <div className="bg-black pt-8 pb-8 sticky top-0">
                    <MusicPlayerControl />
                </div>

                <div className="bg-[#363636] text-white rounded-xl overflow-hidden" >
                    {musicContext.musicList.map((x,i) => <MusicItem key={x.etag} onClick={onSongSelect} index={i} name={/\/(?<filename>.*)\.mp3/gi.exec(x.key)?.groups?.filename} /> )}
                </div>
            </div>

            <div className="fixed bottom-8 right-6 flex flex-col-reverse gap-4 items-end">
                <CircularSvg width="5rem" height="5rem" className={`animate-spin ${musicContext.isPlaying ? "" : "animation-paused"}`}>
                    <MusicIconSvg />
                </CircularSvg>

                <div className="flex flex-col gap-4 mt-4">
                    <CircularSvg width="2.5rem" height="2.5rem" onClick={() => onPlayBehaviourChange("loop")} selected={musicContext.playBehaviour === "loop"}>
                        <MusicLoopSvg />
                    </CircularSvg>

                    <CircularSvg width="2.5rem" height="2.5rem" onClick={() => onPlayBehaviourChange("shuffle")} selected={musicContext.playBehaviour === "shuffle"}>
                        <MusicShuffleSvg />
                    </CircularSvg>
                </div>
            </div>
        </div>
    )
}
