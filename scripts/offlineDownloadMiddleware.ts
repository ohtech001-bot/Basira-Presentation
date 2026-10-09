import { readFile } from 'node:fs/promises';

interface DownloadRequest {
  url?: string;
  method?: string;
}

interface DownloadResponse {
  statusCode: number;
  setHeader: (name: string, value: string | number) => void;
  end: (body?: Buffer | string) => void;
}

/** Serve the built download verbatim, before Vite can transform HTML or fall back to the app. */
export function createOfflineDownloadMiddleware(file: string) {
  return async (
    request: DownloadRequest,
    response: DownloadResponse,
    next: (error?: unknown) => void,
  ): Promise<void> => {
    if (
      request.url?.split('?')[0] !== '/downloads/Basira-Offline.html' ||
      !['GET', 'HEAD'].includes(request.method ?? '')
    ) {
      next();
      return;
    }
    try {
      const content = await readFile(file);
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      response.setHeader('Content-Disposition', 'attachment; filename="Basira-Offline.html"');
      response.setHeader('Content-Length', content.length);
      response.setHeader('Cache-Control', 'no-store');
      response.end(request.method === 'HEAD' ? undefined : content);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        next(error);
        return;
      }
      response.statusCode = 503;
      response.setHeader('Content-Type', 'text/plain; charset=utf-8');
      response.end(
        'نسخة العرض دون إنترنت غير جاهزة بعد. شغّل npm run build أولًا، ثم أعد التحميل.',
      );
    }
  };
}
