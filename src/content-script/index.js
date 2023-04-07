import findShortcut from "../options/utils/findShortcut.js";
import { prepareModal, toggleModal } from "../background/utils/modal.js";
import { getAllCssColors } from "../background/utils/cssReader.js";
import { findHighestOccurences } from "../background/utils/array";

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

    if(shortcut.action.value.code === 'FREE_NOTE'){
        toggleModal();
        return;
    }

    if(shortcut.action.value.code === 'GET_COLORS'){
        const colors = getAllCssColors();

        if(colors.length){
            const colorPalette = findHighestOccurences(colors, 4).map(color => color.item);

            toggleModal(getFrameHtml('src/modal/colors.html'));

            const iframeDocument = document.querySelector('#modal-content').contentDocument;

            for(const [index, color] of colorPalette.entries()){
                const colorNumber = colorPalette.length - index - 1;

                iframeDocument.querySelector(`#c${colorNumber}`).style.backgroundColor = color;
                iframeDocument.querySelector(`#c${colorNumber} > div`).innerText = color.toUpperCase();
            }

            iframeDocument.getElementsByTagName("head")[0].insertAdjacentHTML(
                "beforeend",
                `<link rel="stylesheet" href="${chrome.runtime.getURL('src/modal/index.css')}" />`);

            return;
        }
        console.log("Cannot get colors.");
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
