import React from 'react';
import { MusicContext } from '../contexts';
import { AudioAnalyzer } from '../utils/';

function FrequencyGraph({ audioRef }) {
    const [canvasCtx, setCanvasCtx] = React.useState(null);
    const [audioCtx, setAudioCtx] = React.useState(null);
    const canvas = React.useRef(null);
    const musicContext = React.useContext(MusicContext);

    React.useEffect(function () {
        const ctx = canvas.current.getContext("2d");
        const dpr = window.devicePixelRatio || 1;

        ctx.scale(dpr, dpr);
        const rect = canvas.current.getBoundingClientRect();
        canvas.current.width = rect.width * dpr;
        canvas.current.height = rect.height * dpr;

        ctx.fillStyle = "white";

        setCanvasCtx(ctx);
    }, []);

    React.useEffect(function() {
        if (musicContext.isPlaying) {
            setAudioCtx(new AudioAnalyzer(audioRef.current));
        }
    }, [musicContext.isPlaying])

    React.useEffect(function() {
        if (!musicContext.isPlaying) {
            return;
        }

        let len;
        let barWidth;
        const totalWidth = canvas.current.width;
        const totalHeight = canvas.current.height;

        function raf() {
            requestAnimationFrame(() => {
                if (!musicContext.isPlaying) {
                    return;
                }
    
                const freqData = audioCtx.getFreqs();
                canvasCtx.clearRect(0, 0, totalWidth, totalHeight);
    
                if (len == null && barWidth == null) {
                    len = freqData.length / 2.5;
                    barWidth = totalWidth / len;
                }
    
                for (let i = 0; i < len; i++) {
                    canvasCtx.fillRect(barWidth * i, 0, barWidth - 2, freqData[i] / 255 * (totalHeight - 20));
                }
    
                raf();
            });
        }
    
        raf();
    }, [audioCtx]);

    return (
        <div className="relative">
            <canvas className="w-full h-14 block bg-black -scale-y-100" ref={canvas} />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,#6666,#0000)]" />
            <div className="absolute inset-0 opacity-80 mix-blend-multiply bg-rainbow" />
        </div>
    )
}

export default FrequencyGraph;
