const { app, BrowserWindow } = require("electron");
//const { autoUpdater } = require("electron-updater");
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
/*if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}*/

const createWindow = () => {
    // Create the browser window.
    let mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        autoHideMenuBar: true,
        icon: __dirname + `/assets/img/icon.ico`,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // Open the DevTools.
    //window.webContents.openDevTools();

    // Check for the update.
    /*mainWindow.once('ready-to-show', () => {
        autoUpdater.checkForUpdatesAndNotify();
    });*/
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
});

/*autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update-available');
});

autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update-downloaded');
})*/