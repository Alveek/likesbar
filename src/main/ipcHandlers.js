import { ipcMain } from 'electron';
import { startMonitoring, stopMonitoring, getLikes } from './likesMonitor.js';

export function setupIPCHandlers() {
  ipcMain.handle('start-monitoring', (event, newUrl) => {
    const response = startMonitoring(newUrl);
    return response;
  });

  ipcMain.handle('stop-monitoring', () => {
    const response = stopMonitoring();
    return response;
  });

  ipcMain.handle('get-likes', () => {
    const likes = getLikes();
    return { likes };
  });
}
