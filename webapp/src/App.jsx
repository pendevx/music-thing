import { MusicPlayerControl, MusicItem, CircularSvg, MusicIconSvg, MusicLoopSvg, MusicShuffleSvg } from "./icons";

export default function App({ musicList }) {
    return (
        <div className="font-sans">
            <div className="w-[min(600px,70vw)] ml-auto mr-auto mb-8">
                <div className="bg-black pt-8 pb-8 sticky top-0">
                    <MusicPlayerControl />
                </div>

                <div id="music-list" className="bg-[#363636] text-white rounded-xl overflow-hidden">
                    {musicList.objects.map(x => <MusicItem key={x.etag} item={x} />)}
                </div>
            </div>

            <div className="fixed bottom-8 right-6 flex flex-col-reverse gap-4 items-end">
                <CircularSvg width="5rem" height="5rem" id="music-icon">
                    <MusicIconSvg />
                </CircularSvg>

                <div className="flex flex-col gap-4 mt-4">
                    <CircularSvg width="2.5rem" height="2.5rem" id="music-loop">
                        <MusicLoopSvg />
                    </CircularSvg>

                    <CircularSvg width="2.5rem" height="2.5rem" id="music-shuffle">
                        <MusicShuffleSvg />
                    </CircularSvg>
                </div>
            </div>
        </div>
    )
}
