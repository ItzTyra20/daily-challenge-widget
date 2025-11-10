// Main Electron process
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

  // Load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Optional: Open DevTools for debugging.
  mainWindow.webContents.openDevTools();

// This method will be called when Electron has finished initialization.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// --- IPC Handlers ---
// Listen for a request to close the app and quit.
ipcMain.on('close-app', () => {
  app.quit();
});

// Listen for a request for challenges and send them back.
ipcMain.handle('get-challenges', () => {
  const jsonPath = path.join(__dirname, 'challenges.json');
  const data = fs.readFileSync(jsonPath);
  return JSON.parse(data);
});
