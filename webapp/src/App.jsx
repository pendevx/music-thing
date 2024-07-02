import { MusicPlayerControl, MusicItem, FrequencyGraph } from "./components";
import React from "react";
import { MusicContext } from "./contexts";

export default function App() {
    const audioRef = React.useRef(null);
    const musicContext = React.useContext(MusicContext);

    function onSongSelect(index) {
        musicContext.selectSongAndPlay(index);
    }

    function onKeyDown(e) {

        switch (e.key) {
            case " ": {
                e.preventDefault();

                if (musicContext.currentSong.key == null) {
                    musicContext.next();
                } else {
                    musicContext.isPlaying ? musicContext.pause() : musicContext.play();
                }
                break;
            }
        }
    }

    return (
        <div className="font-sans h-full flex flex-col fixed inset-0 justify-between" onKeyDown={onKeyDown} tabIndex={0}>
            <div className="overflow-auto mt-8 relative">
                <div className="grid grid-cols-[1fr,2fr,1fr] pl-4 pr-4 items-start">
                    <div className="border-r-[1px] border-gray-900 border-solid pr-4 pl-1">
                        <div className={`transition-transform duration-1000`}>
                            <ul>
                                {musicContext.musicList.map((x, i) =>
                                    <MusicItem key={x.etag} id={x.etag} onClick={onSongSelect} index={i} name={/\/(?<filename>.*)\.mp3$/gi.exec(x.key)?.groups?.filename} />
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <FrequencyGraph audioRef={audioRef} />
                <MusicPlayerControl ref={audioRef} />
            </div>
        </div>
    )
}
