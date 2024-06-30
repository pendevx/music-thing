export class AudioAnalyzer {
    constructor(audio) {
        this.audio = audio;
        this.audioCtx = new window.AudioContext();
        this.input = this.audioCtx.createMediaElementSource(this.audio);
        this.analyzer = this.audioCtx.createAnalyser();
        this.analyzer.fftSize = 512;
        this.analyzer.smoothingTimeConstant = 0.75;
        this.count = this.analyzer.frequencyBinCount;
        this.freqsArr = new Uint8Array(this.count);

        this.input.connect(this.analyzer).connect(this.audioCtx.destination);
    }

    getFreqs() {
        this.analyzer.getByteFrequencyData(this.freqsArr);

        return this.freqsArr;
    }
}
