/**
 * Ambient Synthesizer using Web Audio API
 * Generates smooth, soothing ambient chords and textures with zero external asset dependencies.
 */

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    try {
      this.initContext();
      if (!this.ctx) return;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 2.5);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(480, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      this.masterGain.connect(this.filter);
      this.filter.connect(this.ctx.destination);

      // Warm ambient pentatonic chord (F minor 9th / ambient drone)
      const freqs = [174.61, 220.00, 261.63, 329.63, 392.00];

      this.oscillators = freqs.map((freq, idx) => {
        if (!this.ctx) return null as unknown as OscillatorNode;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        // Add subtle detune for warm analog chorusing
        osc.frequency.setValueAtTime(freq + (idx * 0.4 - 0.8), this.ctx.currentTime);

        oscGain.gain.setValueAtTime(0.06 / freqs.length, this.ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.masterGain!);

        osc.start();
        return osc;
      }).filter(Boolean);

      this.isPlaying = true;
    } catch {
      // Audio autoplay policy fallback
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;
    try {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch {}
        });
        this.oscillators = [];
        this.isPlaying = false;
      }, 1250);
    } catch {
      this.isPlaying = false;
    }
  }

  public playClick() {
    if (!this.isPlaying || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {}
  }

  public playPop() {
    if (!this.isPlaying || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.055);
    } catch {}
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const audioEngine = new AmbientAudioEngine();
