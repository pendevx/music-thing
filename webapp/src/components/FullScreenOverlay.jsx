import React from "react";
import { MusicContext } from "../contexts/MusicContext";
import { MusicProgressBar } from "./";
import messageBus from "../utils/MessageBus";
import { formatTime } from "../utils/formats";
import { MusicIconSvg, PlayBehaviourIcon, MusicPausedSvg, MusicPlaySvg, ChangeTrack } from "../icons";

export default function FullScreenOverlay({ hideFullscreen }) {
    const [totalDuration, setTotalDuration] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);
    const musicContext = React.useContext(MusicContext);

    React.useEffect(function () {
        function updateTotalDuration(duration) {
            setTotalDuration(duration);
        }

        function timeUpdate(time) {
            setCurrentTime(time);
        }

        messageBus.subscribe("totalDurationUpdate", updateTotalDuration);
        messageBus.subscribe("audioTimeUpdate", timeUpdate);

        return function () {
            messageBus.unSubscribe("totalDurationUpdate", updateTotalDuration);
            messageBus.unSubscribe("audioTimeUpdate", timeUpdate);
        };
    }, []);

    function onFastForward(secs) {
        messageBus.publish("updateSongTime", secs);
    }

    function handlePlayPause() {
        if (musicContext.isPlaying) {
            musicContext.pause();
        } else {
            musicContext.play();
        }
    }

    function nextPlayBehaviour() {
        let nextBehaviour = "";

        switch (musicContext.playBehaviour) {
            case "loop":
                nextBehaviour = "shuffle";
                break;

            case "shuffle":
                nextBehaviour = null;
                break;

            default:
                nextBehaviour = "loop";
                break;
        }

        musicContext.setPlayBehaviour(nextBehaviour);
    }

    return (
        <div className="absolute left-0 right-0 flex h-full justify-center py-16 text-white">
            <div className="absolute bottom-0 top-0 grid w-3/5 grid-rows-[2fr,1fr,5fr,1fr,1fr,1fr] gap-4 tablet:w-1/2 laptop:w-1/4">
                <h2 className="text mx-auto text-center text-3xl">{musicContext.songName()}</h2>

                <h3 className="mx-auto text-center text-xl">{"Artist" ?? musicContext.artist()}</h3>

                <div className="mx-auto aspect-square w-full rounded-2xl bg-white p-24">
                    <MusicIconSvg />
                </div>

                <MusicProgressBar songDurationSecs={totalDuration} currentTime={currentTime} onFastForward={onFastForward} />

                <span className="textfont-semibold w-full text-center">
                    {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>

                <div className="grid grid-cols-3 grid-rows-2 px-2">
                    <div className="flex h-full cursor-pointer items-center justify-center rounded-[50%] transition-colors duration-300 hover:bg-gray-800">?</div>
                    <div className="flex h-full cursor-pointer items-center justify-center rounded-[50%] transition-colors duration-300 hover:bg-gray-800">?</div>
                    <div className="flex h-full cursor-pointer items-center justify-center rounded-[50%] transition-colors duration-300 hover:bg-gray-800" onClick={nextPlayBehaviour}>
                        <PlayBehaviourIcon playBehaviour={musicContext.playBehaviour} className="lgmobile:p-1 h-full w-full fill-white tablet:p-2" />
                    </div>
                    <div
                        className="flex h-full cursor-pointer items-center justify-center rounded-[50%] transition-colors duration-300 hover:bg-gray-800 tablet:p-2"
                        onClick={() => musicContext.previous()}>
                        <ChangeTrack className="rotate-180" />
                    </div>
                    <div className="flex h-full cursor-pointer items-center justify-center rounded-[50%] transition-colors duration-300 hover:bg-gray-800 tablet:p-2" onClick={handlePlayPause}>
                        {musicContext.isPlaying ? <MusicPausedSvg /> : <MusicPlaySvg />}
                    </div>
                    <div
                        className="flex h-full cursor-pointer items-center justify-center rounded-[50%] transition-colors duration-300 hover:bg-gray-800 tablet:p-2"
                        onClick={() => musicContext.next()}>
                        <ChangeTrack />
                    </div>
                </div>
            </div>

            <button className="fixed bottom-1 left-1 w-fit cursor-pointer px-8 py-4 text-white transition-colors duration-100 hover:bg-zinc-800" onClick={hideFullscreen}>
                Back
            </button>
        </div>
    );
}
