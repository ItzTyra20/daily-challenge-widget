const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 350,
    height: 250,
    frame: false, // Creates a frameless window
    transparent: true, // Makes the window background transparent
    alwaysOnTop: true, // Keeps the widget on top of other windows
    resizable: false,
    webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    contextIsolation: true,
    nodeIntegration: false,
    },
  });

  win.removeMenu();
  win.loadFile("index.html");
  
  ipcMain.on("load-page", (event, page) => {
    win.loadFile(page);
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});