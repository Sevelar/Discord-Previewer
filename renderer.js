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
    var first = true;
    avatar.onclick = () => {
        if (first) {
            var popout = document.createElement('div');
            popout.id = "popout";
            popout.style.top = "90px";
            popout.style.left = "590px";
            popout.className = "layer";
            popout.innerHTML = `<div class="animator animator"><div class="context-menu"><div class="item-group"><div tabindex="0" class="item"><div class="label">Set Avatar</div><div class="hint"><svg name="Link" class="icon-3Gkjwa" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0 5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24 2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24zm2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0 5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24 2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24.973.973 0 0 1 0-1.42z"></path><rect width="24" height="24"></rect></g></svg></div></div><div tabindex="0" class="item"><div class="label">Nickname & Color</div><div class="hint"><svg name="CopyID" class="icon-3Gkjwa" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V5C22 3.34315 20.6569 2 19 2H5ZM8.79741 7.72V16H6.74541V7.72H8.79741ZM13.2097 7.72C16.0897 7.72 17.5897 9.388 17.5897 11.848C17.5897 14.308 16.0537 16 13.2577 16H10.3537V7.72H13.2097ZM13.1497 14.404C14.6137 14.404 15.5257 13.636 15.5257 11.86C15.5257 10.12 14.5537 9.316 13.1497 9.316H12.4057V14.404H13.1497Z"></path></svg></div></div></div></div></div>`
            document.getElementById('layerContainer').appendChild(popout);
            first = false;
        }
        else {
            document.getElementById('layerContainer').innerHTML = "";
            first = true;
        }
    }
}