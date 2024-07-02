import singleton from "../utils/singleton";

class _AudioAnalyzer {
    constructor(audio) {
        const audioCtx = new AudioContext();
        const input = audioCtx.createMediaElementSource(audio);

        this.analyzer = audioCtx.createAnalyser();
        this.analyzer.fftSize = 1024;
        this.analyzer.smoothingTimeConstant = 0.75;

        const count = this.analyzer.frequencyBinCount;
        this.freqsArr = new Uint8Array(count);

        input.connect(this.analyzer).connect(audioCtx.destination);
    }

    getFreqs() {
        this.analyzer.getByteFrequencyData(this.freqsArr);

        return this.freqsArr;
    }
}

export const AudioAnalyzer = singleton(_AudioAnalyzer);
