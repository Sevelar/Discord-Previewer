// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const remote = require('electron').remote;
const { toHTML } = require('discord-markdown');

(function handleWindowControls() {
    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
            updateText();
            updateTime();
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