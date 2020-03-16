const { BrowserWindow, app, Menu } = require("electron");

app.on("ready", () => {
    let window = new BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        autoHideMenuBar: true,
        icon: __dirname + `/assets/img/icon.ico`,
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
    //window.webContents.openDevTools();

    var menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {label: 'Open File...'},
                {label: 'Save'},
                {label: "Save As..."},
                {label: "Exit"}
            ],
            label: "Edit",
            submenu: [
                {label: 'Undo'},
                {label: "Redo"},
                {label: "Cut"},
                {label: "Copy"},
                {label: "Paste"}
            ],
            label: "View",
            submenu: [
                {label: 'Code'},
                {label: "Document"},
                {label: "Likecord"}
            ],
            label: "Help",
            submenu: [
                {label: "Markdown Help"},
                {label: "About"}
            ]
        }
    ])
})

app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});