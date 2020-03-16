// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const remote = require('electron').remote;
const { toHTML } = require('discord-markdown');
const colorPicker = require('a-color-picker');
const fs = require("fs");

(function handleWindowControls() {
    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
            updateText();
            updateTime();
            clickEvent();
        }
    }
})();

function init() {
    let window = remote.getCurrentWindow();
    let minButton = document.getElementById("min-button");
    let maxButton = document.getElementById("max-button");
    let restoreButton = document.getElementById("restore-button");
    let closeButton = document.getElementById("close-button");

    minButton.onclick = () => {
        window.minimize();
    };

    maxButton.onclick = () => {
        window.maximize();
        toggleButton();
    };

    restoreButton.onclick = () => {
        window.unmaximize();
        toggleButton();
    }

    closeButton.onclick = () => {
        window.close();
    }

    function toggleButton() {
        if (window.isMaximized() == true) {
            maxButton.style.display = "none";
            restoreButton.style.display = "flex";
        }
        else {
            restoreButton.style.display = "none";
            maxButton.style.display = "flex";
        }
    }

    const fileMenu = new remote.Menu()
    fileMenu.append(new remote.MenuItem({ label: "New Window", click() {
        const BrowserWindow = remote.BrowserWindow;
        const win = new BrowserWindow({
            height: 720,
            width: 1280,
            frame: false,
            autoHideMenuBar: true,
            icon: __dirname + `/assets/img/icon.ico`,
            webPreferences: {
                nodeIntegration: true
            }
        });
        win.loadFile("index.html");
    }}))
    fileMenu.append(new remote.MenuItem({ label: "Open File...", click() {
        remote.dialog.showOpenDialog({
            title: "Select a text file...",
            properties: ['openFile'],
            filters: [{
                name: 'Text Files', extensions: ['txt']
            }]
        }).then(result => {
            if (!result.canceled) {
                let preview = document.getElementById("preview")
                var text = fs.readFileSync(result.filePaths[0]);
                document.getElementById("text").value = text;
                preview.innerHTML = text;
                preview.innerHTML = toHTML(document.getElementById("text").value)
            }
        })
    }}))
    fileMenu.append(new remote.MenuItem({ type: "separator"}))
    fileMenu.append(new remote.MenuItem({ label: "Save as...", click() {
        remote.dialog.showSaveDialog({
            title: "Save a text file...",
            properties: ['showOverwriteConfirmation'],
            filters: [{
                name: 'Text Files [*.txt]', extensions: ['txt']
            }]
        }).then(result => {
            if (!result.canceled) {
                content = document.getElementById("text").value;
                fs.writeFileSync(result.filePath, content, (err) => {
                    if(err) {
                        console.log("oof")
                    }
                });
                //var latestFile = fs.stat(result.filePath)
            }
        })
    }}))
    fileMenu.append(new remote.MenuItem({ type: "separator"}))
    fileMenu.append(new remote.MenuItem({ label: "Exit", role: "quit"}))

    const editMenu = new remote.Menu()
    editMenu.append(new remote.MenuItem({ role: "editMenu"}));

    document.getElementById("file").onclick = function () {
        fileMenu.popup();
    }
    /*
    document.getElementById("edit").onclick = () => {
        editMenu.popup();
    }*/
}

function updateText() {
    let text = document.getElementById("text");
    let preview = document.getElementById("preview");
    text.onkeyup = text.onkeypress = () => {
        result = toHTML(text.value);
        preview.innerHTML = result;
    }
}

function updateTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById("time").innerHTML = "Today at " + h + ":" + m;
    var t = setTimeout(updateTime, 2000);
    
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
}

function clickEvent() {
    let avatar = document.getElementById("avatar");
    avatar.onclick = () => {
        var shaker = document.createElement('div');
        var backdrop = document.createElement('div');
        backdrop.className = "backdrop";
        shaker.className = "layer";
        document.getElementById('layerContainer').appendChild(backdrop);
        document.getElementById('layerContainer').appendChild(shaker);
        shaker.innerHTML = `<div class="shaker"><div class="shaker-avatar-container"><img src="assets/img/default-avatar.png" class="shaker-avatar" id="shaker-avatar"><div class="shaker-avatar-username" id="shaker-avatar-username">Default User</div></div><div class="shaker-container"><div class="shaker-context-menu"><div class="shaker-item" id="nickname"><div class="shaker-label">Set Nickname</div><div class="shaker-hint"><svg name="CopyID" class="icon-3Gkjwa" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V5C22 3.34315 20.6569 2 19 2H5ZM8.79741 7.72V16H6.74541V7.72H8.79741ZM13.2097 7.72C16.0897 7.72 17.5897 9.388 17.5897 11.848C17.5897 14.308 16.0537 16 13.2577 16H10.3537V7.72H13.2097ZM13.1497 14.404C14.6137 14.404 15.5257 13.636 15.5257 11.86C15.5257 10.12 14.5537 9.316 13.1497 9.316H12.4057V14.404H13.1497Z"></path></svg></div></div><div class="shaker-item" id="color"><div class="shaker-label">Set Color</div><div class="shaker-hint" id="color-pick"><div style="width: 20px; height: 20px; border-radius: 50%; margin: 0 auto; background-color: #fff;" id="picked"></div></div></div></div></div></div>`;
        cAvatar = document.getElementById('shaker-avatar');

        if (avatar.src != "assets/img/default-avatar.png") {
            cAvatar.src = avatar.src;
        }

        if (document.getElementById("username") != "Default User") {
            document.getElementById("shaker-avatar-username").innerHTML = document.getElementById("username").innerHTML
        }

        if (document.getElementById("username").style.color != "#fff") {
            document.getElementById("picked").style.backgroundColor = document.getElementById("username").style.color
        }

        cAvatar.onclick = () => {
            remote.dialog.showOpenDialog({
                title: 'Select an image...',
                properties: ['openFile'],
                filters: [{
                    name: 'Images', extensions: ['jpg', 'png']
                }]
            }).then(result => {
                if (!result.canceled) {
                    cAvatar.src = result.filePaths;
                    avatar.src = result.filePaths;
                }
                else {
                    if (cAvatar == "data/default-avatar.png") {
                        cAvatar.src = "assets/img/default-avatar.png"
                        avatar.src = "assets/img/default-avatar.png"
                    }
                    else {
                        return;
                    }
                }
            })
        }

        document.getElementById("nickname").onclick = () => {
            var popup = document.createElement('div');
            popup.className = "layer";
            document.getElementById('layerContainer').appendChild(popup);
            popup.innerHTML = `<form id="nickname-set" class="nickname"><div class="nickname-header"><h4>Change Nickname</h4></div><div class="nickname-container"><div class="nickname-container-inner"><div class="nickname-container-spacing"><h5>Set New Nickname</h5><input type="text" placeholder="Default User" maxlength="16" autocomplete="off" id="nick"></div></div></div><div class="nickname-footer"><button class="nickname-button" id="confirm" type="submit"><div>Set Nickname</div></button><button class="nickname-button" id="cancel" type="button"><div>Cancel</div></button></div></form>`            
            document.getElementById('layerContainer').removeChild(shaker);

            document.getElementById("nickname-set").onsubmit = (e) => {
                document.getElementById("username").innerHTML = document.getElementById('nick').value;
                e.preventDefault();
                document.getElementById("nickname-set").animate({
                    opacity: [1,0],
                    transform: ["scale(1)", "scale(0)"]
                }, 130)
                backdrop.animate({
                    opacity: [ 0.85, 0 ],
                    backgroundColor: [ "#000" , "transparent" ]
                }, 130).onfinish = () => {
                    document.getElementById('layerContainer').innerHTML="";
                }
            }

            document.getElementById("cancel").onclick = () => {
                document.getElementById("nickname-set").animate({
                    opacity: [1,0],
                    transform: ["scale(1)", "scale(0)"]
                }, 130)
                backdrop.animate({
                    opacity: [ 0.85, 0 ],
                    backgroundColor: [ "#000" , "transparent" ]
                }, 130).onfinish = () => {
                    document.getElementById('layerContainer').innerHTML="";
                }
            }

            backdrop.onclick = () => {
                backdrop.animate({
                    opacity: [ 0.85, 0 ],
                    backgroundColor: [ "#000" , "transparent" ]
                }, 130)
                popup.animate({
                    opacity: [1,0],
                    transform: ["scale(1)", "scale(0)"]
                }, 130).onfinish = () => {
                    document.getElementById('layerContainer').innerHTML="";
                }
            }
        }

        document.getElementById("color").onclick = () => {
            var popup = document.createElement('div');
            popup.className = "layer";
            document.getElementById('layerContainer').appendChild(popup);
            popup.innerHTML = `<div class="shaker" style="width: 350px; height: 550px;"><div class="nickname-header" style="background-color: #2f3136; border-top-left-radius: 3px; border-top-right-radius: 3px;"><h4>Change Color</h4></div><div class="nickname-container"><div class="color-container-inner" id="color-picker"></div>`
            document.getElementById('layerContainer').removeChild(shaker);
            colorPicker.from('#color-picker').on('change', (picker, color) => {
                document.getElementById("username").style.color = color;
            })
            backdrop.onclick = () => {
                backdrop.animate({
                    opacity: [ 0.85, 0 ],
                    backgroundColor: [ "#000" , "transparent" ]
                }, 130)
                popup.animate({
                    opacity: [1,0],
                    transform: ["scale(1)", "scale(0)"]
                }, 130).onfinish = () => {
                    document.getElementById('layerContainer').innerHTML="";
                }
            }
        }

        backdrop.onclick = () => {
            backdrop.animate({
                opacity: [ 0.85, 0 ],
                backgroundColor: [ "#000" , "transparent" ]
            }, 130)
            shaker.animate({
                opacity: [1,0],
                transform: ["scale(1)", "scale(0)"]
            }, 130).onfinish = () => {
                document.getElementById('layerContainer').innerHTML="";
            }
        }
    }
}