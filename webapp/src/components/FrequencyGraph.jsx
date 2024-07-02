import React from 'react';
import { MusicContext } from '../contexts';

function _FrequencyGraph({ audioCtx }, ref) {
    const [canvasCtx, setCanvasCtx] = React.useState(null);
    const musicContext = React.useContext(MusicContext);

    React.useEffect(function () {
        const ctx = ref.current.getContext("2d");
        const dpr = window.devicePixelRatio || 1;

        ctx.scale(dpr, dpr);
        const rect = ref.current.getBoundingClientRect();
        ref.current.width = rect.width * dpr;
        ref.current.height = rect.height * dpr;

        ctx.fillStyle = "white";

        setCanvasCtx(ctx);
    }, []);

    // audioCtx is null when uninitialized, will be populated when a song has started playing
    React.useEffect(function () {
        if (!musicContext.isPlaying) {
            return;
        }

        let len;
        let barWidth;
        const totalWidth = ref.current.width;
        const totalHeight = ref.current.height;

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
            <canvas className="w-full h-14 block bg-black -scale-y-100" ref={ref} />
            <div className="absolute inset-0 opacity-80 mix-blend-multiply bg-rainbow" />
        </div>
    )
}

export const FrequencyGraph = React.forwardRef(_FrequencyGraph);
