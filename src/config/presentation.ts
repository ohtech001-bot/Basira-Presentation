const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
import { uiAssets } from '../data/uiAssets';

export const presentationConfig = {
  width: 1920,
  height: 1080,
  controlHideDelay: 2600,
  assets: {
    opening: uiAssets.qaytbay.src,
    logo: uiAssets.logo.src,
  },
  audio: {
    enabled: false,
    ambience: asset('assets/audio/ambience.mp3'),
    click: asset('assets/audio/click.mp3'),
    transition: asset('assets/audio/transition.mp3'),
  },
} as const;
