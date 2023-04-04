import findShortcut from "../options/utils/findShortcut.js";
import { prepareModal, toggleModal } from "../background/utils/modal.js";

let shortcuts = [];
let keys = [];

const runAction = async (action, strategy) => {
    keys = [];

    if(action.code === 'FREE_NOTE'){
        toggleModal();
        return;
    }

    await chrome.runtime.sendMessage({
        event: 'action',
        action: action,
        strategy: strategy
    });
}

const afterDOMLoaded = async () => {
    shortcuts = await chrome.runtime.sendMessage({
        event: 'loaded',
    });

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

            await runAction(shortcut.action, shortcut.strategy);
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
            const shortcut = shortcutsFound[0];

            await runAction(shortcut.action, shortcut.strategy);
        }
    }
}

export { }
