import findShortcut from "../options/utils/findShortcut.js";
import {isModalOpened, openModal, prepareModal, setIFrameContent} from "../background/utils/modal.js";

let shortcuts = [];
let keys = [];

const setShortcuts = async () => {
    shortcuts = await chrome.runtime.sendMessage({
        event: 'loaded',
    });
}

const executeAction = async (shortcut) => {
    await chrome.runtime.sendMessage({
        event: 'action',
        shortcut: shortcut
    });
}

function getFrameHtml(file) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", chrome.runtime.getURL(file), false);
    xmlhttp.send();

    return xmlhttp.responseText;
}

const runAction = async (shortcut) => {
    keys = [];

    if(isModalOpened())
        return;

    if(shortcut.action.value.code === 'FREE_NOTE'){
        const freeNoteIFrame = getFrameHtml('src/modal/free-note.html');

        setIFrameContent(freeNoteIFrame, 'FREE_NOTE');

        openModal();

        return;
    }

    if(shortcut.action.value.code === 'GET_COLORS'){
        const colorsIFrame = getFrameHtml('src/modal/colors.html');

        setIFrameContent(colorsIFrame, 'GET_COLORS');

        openModal();

        return;
    }

    await executeAction(shortcut);
}

const afterDOMLoaded = async () => {
    await setShortcuts();

    prepareModal();
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afterDOMLoaded);
} else {
    await afterDOMLoaded();
}

document.onkeyup = async (e) => {
    if(keys.length === 2){
        const shortcut = findShortcut(shortcuts, keys);

        if(shortcut) {
            e.preventDefault();

            await runAction(shortcut);
        }
    }

    keys.splice(keys.indexOf(e.key), 1);
}

document.onkeydown = async (e) => {
    if(keys.length === 3)
        return;

    if(!keys.includes(e.key))
        keys.push(e.key);

    if(keys.length > 1) {
        const shortcutsFound = shortcuts
            .filter(shortcut =>
                keys
                    .every(key => Object.assign([], shortcut.keys).includes(key))
            );

        if(shortcutsFound.length)
            e.preventDefault();

        if(
            shortcutsFound.length === 1 &&
            Object.assign([], shortcutsFound[0].keys).length === keys.length
        ) {
            await runAction(shortcutsFound[0]);
        }
    }
}

export { }
