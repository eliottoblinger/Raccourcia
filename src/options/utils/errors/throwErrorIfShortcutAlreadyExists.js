const shortcutAlreadyExists = (shortcuts, shortcut) => {
    const shortcutAlreadyExists = shortcuts
        .find(st =>
            Object.assign([], st.keys)
                .sort()
                .join(',') ===
            shortcut
                .keys
                .sort()
                .join(',')
        );

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
