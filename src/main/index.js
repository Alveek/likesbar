import { app, BrowserWindow } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import { createWindow } from './window.js';
import { setupIPCHandlers } from './ipcHandlers.js';
import { stopMonitoring } from './likesMonitor.js';

app.on('ready', () => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();
  setupIPCHandlers();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  stopMonitoring();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
