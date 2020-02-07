const { BrowserWindow, app } = require("electron");

app.on("ready", () => {
    let window = new BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load HTML into window
    window.loadFile("index.html");

    // Closing window
    window.on("closed", () => {
        window = null;
    });

    // Open DevTools
    window.webContents.openDevTools();
})

app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});