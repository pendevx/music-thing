import { Layout } from "../../Layout";
import MusicItem from "../../components/MusicItem";
import { html } from "hono/html";
import keys from "./keys";
import MusicIconSvg from "../../components/MusicIcon.svg";
import MusicPlayerControl from "../../components/MusicPlayerControl";
import MusicLoopSvg from "../../components/MusicLoop.svg";
import MusicShuffleSvg from "../../components/MusicShuffle.svg";
import CircularSvg from "../../components/CircularSvg";

type ResponseObject = {
    uploaded: string,
    size: number,
    key: string,
    checksums: {
        md5: string
    },
    httpEtag: string,
    etag: string,
    version: string
}

export type Response = {
    objects: ResponseObject[]
}

export default async function Page({ env }: any) {
    // const keys: Response = await env.MUSIC.list();

    return (
        <Layout title="Page">
            <div class="w-[min(600px,70vw)] ml-auto mr-auto mb-8">
                <div class="bg-black pt-8 pb-8 sticky top-0">
                    <MusicPlayerControl />
                </div>

                <div id="music-list" class="bg-[#363636] text-white rounded-xl overflow-hidden">
                    {keys.objects.map(x => <MusicItem item={x} />)}
                </div>
            </div>

            <div class="fixed bottom-8 right-6 flex flex-col-reverse gap-4 items-end">
                <CircularSvg tailwindWidth="20" tailwindHeight="20" id="music-icon">
                    <MusicIconSvg />
                </CircularSvg>

                <div class="flex flex-col gap-4 mt-4">
                    <CircularSvg tailwindWidth="10" tailwindHeight="10" id="music-loop">
                        <MusicLoopSvg />
                    </CircularSvg>

                    <CircularSvg tailwindWidth="10" tailwindHeight="10" id="music-shuffle">
                        <MusicShuffleSvg />
                    </CircularSvg>
                </div>
            </div>

            <script>
{html`
const musicList = document.getElementById("music-list");
const audio = document.querySelector("audio");
const audioTime = document.getElementById("audio-time");
const mins = document.getElementById("mins");
const secs = document.getElementById("secs");
const totalMins = document.getElementById("total-mins");
const totalSecs = document.getElementById("total-secs");
const playBtn = document.getElementById("play-btn");
const musicIcon = document.getElementById("music-icon");
const musicLoop = document.getElementById("music-loop");
const musicShuffle = document.getElementById("music-shuffle");

class State {
    constructor(songsList) {
        this.playBehaviour = localStorage.getItem("playBehaviour") || "";
        this.songIndex = 0;
        this.songsList = songsList;
    }

    get playBehaviour() {
        return localStorage.getItem("playBehaviour") || "";
    }

    set playBehaviour(value) {
        localStorage.setItem("playBehaviour", value);
    }

    get nextSong() {
        this.songIndex++;
        if (this.songIndex >= this.songsList.length) this.songIndex = 0;
        return this.songsList[this.songIndex];
    }

    get prevSong() {
        this.songIndex--;
        if (this.songIndex < 0) this.songIndex = this.songsList.length - 1;
        return this.songsList[this.songIndex];
    }

    get randomSong() {
        return this.songsList[Math.floor(Math.random() * this.songsList.length)];
    }
}

const state = new State(musicList.children);

musicList.addEventListener("click", async e => {
    if (e.target.tagName === "A") {
        audio.pause();
        document.querySelector(".playing")?.classList.remove("playing");

        audio.src = e.target.dataset.fetch;
        try {
            audio.load();
            await audio.play();
            if (isNaN(audio.duration)) {
                totalMins.innerText = "--";
                totalSecs.innerText = "--";
            } else {
                totalMins.innerText = Math.floor(audio.duration / 60).toString().padStart(2, "0");
                totalSecs.innerText = Math.floor(audio.duration % 60).toString().padStart(2, "0");
                audioTime.max = audio.duration;
                audio.dataset.playing = true;
            }
        } catch (e) {}

        e.target.classList.add("playing");
    }
});

const timeUpdateHandler = () => {
    audioTime.value = audio.currentTime;
    mins.innerText = Math.floor(audio.currentTime / 60).toString().padStart(2, "0");
    secs.innerText = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
};

audioTime.addEventListener("mousedown", () => {
    audio.removeEventListener("timeupdate", timeUpdateHandler);
});

audioTime.addEventListener("mouseup", () => {
    audio.addEventListener("timeupdate", timeUpdateHandler);
});

audioTime.addEventListener("change", () => {
    audio.currentTime = audioTime.value;
});

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        audio.dataset.playing = true;
    } else {
        audio.pause();
        audio.dataset.playing = false;
    }
});

const musicEndHandler = e => {
    if (state.playBehaviour === "shuffle") {
        const musicItems = document.querySelectorAll("#music-list a");
        const randomIndex = Math.floor(Math.random() * musicItems.length);
        musicItems[randomIndex].click();
    } else if (state.playBehaviour === "loop") {
        e.target.currentTime = 0;
        e.target.play();
    } else {
        state.nextSong.click();
    }
};

const innerColor = "#00eaff";
const outerColor = "#00b0f0";
const circularButtonGradient = "radial-gradient(" + innerColor + " 65%, " + outerColor + " 65% 100%)";
const defaultCircularButtonColor = 'radial-gradient("black")';
const svgFillColor = "#5c5c5c";

function handler(newPlayBehaviour, opposingElement) {
    state.playBehaviour = state.playBehaviour === newPlayBehaviour ? "" : newPlayBehaviour;
    opposingElement.style.background = "white";
    opposingElement.querySelectorAll("svg,path").forEach(x => x.style.fill = "black");
    
    this.style.background = state.playBehaviour === newPlayBehaviour ? circularButtonGradient : "";
    this.querySelectorAll("svg,path").forEach(x => x.style.fill = state.playBehaviour === newPlayBehaviour ? svgFillColor : "black");

    audio.loop = newPlayBehaviour === "loop";

    if (newPlayBehaviour === "shuffle") {
        audio.addEventListener("ended", musicEndHandler);
    } else {
        audio.removeEventListener("ended", musicEndHandler);
    }
}

musicLoop.addEventListener("click", () => {
    handler.call(musicLoop, "loop", musicShuffle);
});

musicShuffle.addEventListener("click", () => {
    handler.call(musicShuffle, "shuffle", musicLoop);
});

(()=>{
    if (state.playBehaviour === "loop") {
        musicLoop.style.background = circularButtonGradient;
        musicLoop.querySelectorAll("svg,path").forEach(x => x.style.fill = svgFillColor);
    } else if (state.playBehaviour === "shuffle") {
        audio.addEventListener("ended", musicEndHandler);
        musicShuffle.style.background = circularButtonGradient;
        musicShuffle.querySelectorAll("svg,path").forEach(x => x.style.fill = svgFillColor);
    }

    audio.addEventListener("timeupdate", timeUpdateHandler);
})();


`}
            </script>
        </Layout>
    );
}
