export default function MusicPlayerControl() {
    return (
        <div className="bg-black">
            <audio></audio>

            <div className="bg-white rounded-[2em] pl-4 pr-4">
                <div className="w-full h-16 flex overflow-hidden items-center gap-2">
                    <div id="play-btn" className="hover:bg-gray-200 h-[60%] aspect-square flex justify-center items-center rounded-[50%] cursor-pointer transition-color duration-300">
                        <div className="border-l-black border-solid w-0 border-transparent border-[0.7em] translate-x-[30%]"></div>
                    </div>

                    <div className="grow">
                        <input type="range" id="audio-time" className="w-full block" min="0" value="0" />
                    </div>

                    <div>
                        <span id="mins">00</span>:
                        <span id="secs">00</span> /
                        <span id="total-mins"> 00</span>:
                        <span id="total-secs">00</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
