import throwErrorIfShortcutAlreadyExists from "../utils/errors/throwErrorIfShortcutAlreadyExists.js";

const createShortcut = async (shortcut) => {
    if(chrome?.storage){
        const { shortcuts } = await chrome.storage.sync.get(["shortcuts"]);

        throwErrorIfShortcutAlreadyExists(shortcuts, shortcut);

        shortcut.id = shortcuts.length + 1;

        shortcuts.push(shortcut);

        await chrome.storage.sync.set({
            shortcuts: shortcuts
        });
    }
}

const updateShortcut = async (shortcut) => {
    if(chrome?.storage){
        const { shortcuts } = await chrome.storage.sync.get(["shortcuts"]);

        throwErrorIfShortcutAlreadyExists(shortcuts, shortcut);

        shortcuts[shortcuts.findIndex(st => st.id === shortcut.id)] = shortcut;

        await chrome.storage.sync.set({
            shortcuts: shortcuts
        });
    }
}

const deleteShortcut = async (shortcutId) => {
    if(chrome?.storage){
        const { shortcuts } = await chrome.storage.sync.get(["shortcuts"]);

        shortcuts.splice(shortcuts.findIndex(st => st.id === shortcutId), 1);

        await chrome.storage.sync.set({
            shortcuts: shortcuts
        });
    }
}

export default {
    createShortcut,
    updateShortcut,
    deleteShortcut
}
