import findShortcut from "../options/utils/findShortcut.js";

let shortcuts = [];
let keys = [];

const runAction = async (action, strategy, tabId) => {
    keys = [];

    if([3, 4, 5].includes(action.id)){
        const events = [
            'openTab',
            'duplicateTab',
            'closeTab'
        ];

        await chrome.runtime.sendMessage({
            event: events[action.id - 3],
            url: strategy.instruction
        });
    }
}

const afterDOMLoaded = async () => {
    shortcuts = await chrome.runtime.sendMessage({
        event: 'loaded',
    });
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',afterDOMLoaded);
} else {
    await afterDOMLoaded();
}

document.onkeyup = async (e) => {
    if(keys.length === 2){
        const shortcut = findShortcut(shortcuts, keys);

        if(shortcut) {
            e.preventDefault();

            const tabId = await chrome.runtime.sendMessage({
                event: 'askTabId',
            });

            await runAction(shortcut.action, shortcut.strategy, tabId);
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

            const tabId = await chrome.runtime.sendMessage({
                event: 'askTabId',
            });

            await runAction(shortcut.action, shortcut.strategy, tabId);
        }

        /*
        const insertPromise = await chrome.scripting.insertCSS({
            files: ["style.css"],
            target: { tabId: tab.id }
        });
         */
    }
}

export { }
