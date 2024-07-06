import { MusicPlayerControl, FrequencyGraph, MusicList, Lyrics } from "./components";
import React from "react";
import { MusicContext } from "./contexts/MusicContext";
import { SongList } from "./icons";

const lyrics = `[00:00.00]把回忆拼好给你
[00:05.00]王贰浪
[00:27.80]我们之间的回忆
[00:30.55]全部都小心地收集
[00:33.67]我总是偷偷地哭泣
[00:36.56]像倦鸟失了归期
[00:39.87]但愿我相信的爱情
[00:42.52]结局紧握在我手心
[00:45.30]时光匆匆却没有遗失过去
[00:55.25]希望我们 有光明的未来
[00:58.02]还有能够装下星空的期待
[01:00.93]可现实为何让我感到如此懈怠
[01:04.05]总怀念相遇时我们无视落叶和人海
[01:07.66]是你让我勇敢不再像颗尘埃
[01:10.38]是你常帮我照料装着梦的盆栽
[01:13.25]每一天我们都是如此愉快
[01:16.05]一直到天色渐晚看着落日无奈离开
[01:19.65]我知道你爱集邮爱笑甚至爱发呆
[01:22.39]我知道你怕草虫还有夜晚的妖怪
[01:25.35]我喜欢你有一点心不在焉的状态
[01:28.53]看起来像个回到七岁时候的小孩
[01:31.64]该如何将我这份感情向你告白
[01:34.12]喜欢却又不敢爱
[01:35.69]直到整个宇宙
[01:37.57]在为我焦虑失神慌张之中醒来
[01:40.33]就像是黑暗过后黎明盛开
[01:43.35]我们之间的回忆
[01:45.47]全部都小心地收集
[01:48.39]我总是偷偷地哭泣
[01:51.47]像倦鸟失了归期
[01:54.29]但愿我相信的爱情
[01:57.28]结局紧握在我手心
[02:00.32]时光匆匆却没有遗失过去
[02:18.74]那天你在雨后街角答应接受我的爱
[02:22.39]那一刻我的世界有了色彩
[02:25.33]这一生无法忘记关于澄蓝色的你
[02:28.37]像一份礼物悄然呈现在我的境遇
[02:31.22]我们从清晨起玩一整天游戏
[02:34.37]到夜晚一起看我最爱的剧
[02:37.38]能够拥有这些已足够幸运
[02:40.21]我已经不再期待其他什么东西
[02:43.67]我们也经常争执互相不接电话
[02:46.45]在同一房间终于呼叫冷漠抵达
[02:49.36]也曾想过以后生活没有人牵挂
[02:52.19]把爱扔掉只剩一块残酷伤疤
[02:55.67]而那些你送我的梦，教我折的花
[02:58.82]逃亡的盛夏
[03:00.28]在夜空隐没之际为我点燃烟花
[03:02.99]寂寞时让我把快乐拼起来吧
[03:06.51]我们之间的回忆
[03:09.37]全部都小心地收集
[03:12.31]我总是偷偷地哭泣
[03:15.32]像倦鸟失了归期
[03:18.29]但愿我相信的爱情
[03:21.23]结局紧握在我手心
[03:24.23]时光匆匆却没有遗失过去
[03:30.87]我们可以就像是孩子一样成长
[03:36.49]永远无所畏惧义无反顾向着未知的前方
[03:42.64]原来我们每天努力长成看似大人的模样
[03:48.73]为了可以一起跨越山和海洋
[03:54.08]那时的我每天都祈祷 实现这个梦想
[04:01.82]现在的你还好吗
[04:03.85]是否还会像从前一样的爱笑
[04:07.42]现在的你还好吗
[04:09.73]当你径直在我面前坦言放下
[04:13.32]现在的你还好吗
[04:15.63]是否像从前一样有无限的温柔啊
[04:19.45]现在的你还好吗
[04:22.42]愿你能保持月亮般的心，要爱自己啊
[04:27.80]我们之间的回忆
[04:30.28]全部都小心地收集
[04:33.29]我总是偷偷地哭泣
[04:36.28]像倦鸟失了归期
[04:39.58]但愿我相信的爱情
[04:42.12]结局紧握在我手心
[04:45.06]时光匆匆却没有遗失过去
[04:51.92]独自收集两个人之间的回忆
[04:54.63]即使每当到这时候我都会哭泣
[04:57.61]为何一切，变得如此，无法回到过去
[05:03.99]但我仍愿意感谢你给过我爱情
[05:06.56]每一场风景都是我们爱的证明
[05:09.66]就算如今，天各一方，祝你余生动听啊
[05:15.90]独自收集两个人之间的回忆
[05:18.60]即使每当到这时候我都会哭泣
[05:21.82]为何一切，变得如此，无法回到过去
[05:27.80]但我仍愿意感谢你给过我爱情
[05:30.63]每一场风景都是我们爱的证明
[05:33.61]就算如今，天各一方，把回忆拼好给你`
    .split("\n")
    .map(x => {
        const regex = /\[(\d{2}):(\d{2})\.(\d{2})?\](.*)/gi;
        const match = regex.exec(x);

        return {
            time: +match[1] * 60 + +match[2] + +match[3] / 1000,
            words: match[4],
        };
    });

export default function App() {
    const [showSonglist, setShowSonglist] = React.useState(true);
    const [bodyHeight, setBodyHeight] = React.useState(0);
    const audioRef = React.useRef(null);
    const bodyRef = React.useRef(null);
    const musicContext = React.useContext(MusicContext);

    React.useEffect(function () {
        function resizeHandler() {
            setBodyHeight(bodyRef.current.clientHeight);
        }

        resizeHandler();

        window.addEventListener("resize", resizeHandler);

        return function () {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

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
        <div className="fixed inset-0 flex h-full flex-col justify-between font-sans" onKeyDown={onKeyDown} tabIndex={0}>
            <div className="mt-4 overflow-hidden">
                <div ref={bodyRef} className="r-0 relative flex max-h-full w-full justify-end laptop:right-[33.33333%] laptop:w-[133.33333%] desktop:right-[25%] desktop:w-[125%]">
                    <MusicList />
                    <Lyrics lyrics={lyrics} height={bodyHeight / 2} showSonglist={showSonglist} toggleShowSonglist={() => setShowSonglist(!showSonglist)} />

                    <div
                        className={`fixed z-20 my-auto flex h-12 w-12 items-center justify-center bg-[#0f0f0f] transition-all duration-1000 laptop:hidden ${showSonglist ? "right-8 top-8" : "right-6 top-6"}`}
                        onClick={() => setShowSonglist(!showSonglist)}>
                        <SongList />
                    </div>
                </div>
            </div>

            <div>
                <FrequencyGraph audioRef={audioRef} />
                <MusicPlayerControl ref={audioRef} />
            </div>
        </div>
    );
}
