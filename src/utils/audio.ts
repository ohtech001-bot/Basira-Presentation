export type AudioCue = 'background' | 'click' | 'transition';

export interface AudioSources {
  background: string;
  click: string;
  transition: string;
}

const assetPath = (file: string) => `${import.meta.env.BASE_URL}assets/audio/${file}`;

export const defaultAudioSources: AudioSources = {
  background: assetPath('ambience.mp3'),
  click: assetPath('click.mp3'),
  transition: assetPath('transition.mp3'),
};

/**
 * Audio is opt-in. Call setEnabled(true) from a user gesture.
 * Missing files and browser autoplay refusal stay silent and never block navigation.
 */
export class PresentationAudio {
  private enabled = false;
  private disposed = false;
  private volume = 0.3;
  private elements = new Map<AudioCue, HTMLAudioElement>();
  private unavailable = new Set<AudioCue>();
  private sources: AudioSources;

  constructor(sources: Partial<AudioSources> = {}) {
    this.sources = { ...defaultAudioSources, ...sources };
  }

  get isEnabled() {
    return this.enabled && !this.disposed;
  }

  setEnabled(enabled: boolean) {
    if (this.disposed) return;
    this.enabled = enabled;
    if (!enabled) this.pauseAll();
  }

  setVolume(volume: number) {
    if (!Number.isFinite(volume)) return;
    this.volume = Math.max(0, Math.min(1, volume));
    for (const [cue, element] of this.elements) {
      element.volume = this.volume * (cue === 'background' ? 0.5 : 1);
    }
  }

  startBackground() {
    return this.play('background');
  }

  stopBackground() {
    this.elements.get('background')?.pause();
  }

  playClick() {
    return this.play('click');
  }

  playTransition() {
    return this.play('transition');
  }

  async play(cue: AudioCue): Promise<void> {
    if (!this.isEnabled || this.unavailable.has(cue) || typeof Audio === 'undefined') return;

    let element = this.elements.get(cue);
    if (!element) {
      element = new Audio(this.sources[cue]);
      element.preload = 'none';
      element.loop = cue === 'background';
      element.volume = this.volume * (cue === 'background' ? 0.5 : 1);
      element.onerror = () => {
        this.unavailable.add(cue);
        element?.pause();
      };
      this.elements.set(cue, element);
    }

    try {
      if (cue !== 'background') element.currentTime = 0;
      await element.play();
      // A pending play promise must not restart audio after disabling or teardown.
      if (!this.isEnabled) element.pause();
    } catch {
      // Autoplay refusal or missing media must remain a silent, recoverable no-op.
    }
  }

  pauseAll() {
    for (const element of this.elements.values()) element.pause();
  }

  dispose() {
    this.enabled = false;
    this.disposed = true;
    this.pauseAll();
    for (const element of this.elements.values()) {
      element.onerror = null;
      element.removeAttribute('src');
      element.load();
    }
    this.elements.clear();
    this.unavailable.clear();
  }
}

export function createPresentationAudio(sources: Partial<AudioSources> = {}) {
  return new PresentationAudio(sources);
}
