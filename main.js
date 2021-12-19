const { app, BrowserWindow, ipcMain: ipc } = require("electron");
require('v8-compile-cache');

const rpc = require("discord-rpc");
const client = new rpc.Client({ transport: 'ipc' });

const AppID = "873161814635085877"
const details = "Monitoring Service."
const largeImageKey = "icon"
const largeImageText = "Apptime Desktop"

client.on('ready', () => {

  client.setActivity({
    details: details,
    largeImageKey: largeImageKey,
    largeImageText: largeImageText,
    startTimestamp: new Date(),
    buttons: [
      { label: "Join Apptime", url: "https://www.apptime.tech" }, { label: "Download Desktop App", url: "https://github.com/apptime-service" },
    ]
  });
});
rpc.register(AppID);
client.login({ clientId: AppID }).catch((error) => {
  throw error.message;
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 1100,
    minHeight: 700,
    title: 'Loading...',
    webPreferences: {
      plugins: true,
      nodeIntegration: true,
    },
    autoHideMenuBar: true,
    icon: 'images/icon.png',
    frame: true,
    center: true,
    fullscreen: false
  });

  win.webContents.insertCSS('body { background-color: black; -webkit-user-select: none; -ms-user-select: none; user-select: none; } ::-webkit-scrollbar { display: none; }')
  win.loadURL("https://www.apptime.tech")
  win.setMenu(null);

}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});