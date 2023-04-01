import findShortcut from "../findShortcut.js";


const shortcutAlreadyExists = (shortcuts, shortcut) => {
    const shortcutAlreadyExists = findShortcut(shortcuts, shortcut.keys);

    return !shortcutAlreadyExists ?
        false :
        shortcutAlreadyExists.id !== shortcut.id;
}

const throwErrorIfShortcutAlreadyExists = (shortcuts, shortcut) => {
    if(shortcutAlreadyExists(
        shortcuts,
        shortcut
    ))
        throw new Error('Shortcut already exists');
}

export default throwErrorIfShortcutAlreadyExists;
