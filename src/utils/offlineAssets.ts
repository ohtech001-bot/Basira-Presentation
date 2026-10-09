declare global {
  interface Window {
    __BASIRA_OFFLINE__?: boolean;
    __BASIRA_OFFLINE_ASSETS__?: Readonly<Record<string, string>>;
  }
}

/** The exported HTML supplies the same images directly, with no file or network requests. */
export function getUiAssetUrl(servedFile: string): string {
  const embedded =
    typeof window === 'undefined' ? undefined : window.__BASIRA_OFFLINE_ASSETS__?.[servedFile];
  return (
    embedded ?? `${import.meta.env?.BASE_URL ?? './'}assets/ui/${encodeURIComponent(servedFile)}`
  );
}

export function isOfflinePresentation(): boolean {
  return typeof window !== 'undefined' && window.__BASIRA_OFFLINE__ === true;
}

export const offlinePresentationDownloadUrl = `${import.meta.env?.BASE_URL ?? './'}downloads/Basira-Offline.html`;
