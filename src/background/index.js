const getCurrentTab = async () => {
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    return tabs[0];
}

const runAction = async (shortcut) => {
    const tab = await getCurrentTab();

    if(shortcut.action.value.code === 'NEW_TAB'){
        const url = shortcut.action.strategy.name === 'Libre' || shortcut.action.strategy.instruction.trim() === '' ?
            'chrome://new-tab-page/' :
            shortcut.action.strategy.instruction;

        chrome.tabs.create({
            index: tab.index+1,
            url: url,
            active: true
        });
    }

    if(shortcut.action.value.code === 'DUP_TAB')
        chrome.tabs.duplicate(tab.id);

    if(shortcut.action.value.code === 'CLO_TAB')
        chrome.tabs.remove(tab.id);

    if(shortcut.action.value.code === 'PIN_TAB')
        chrome.tabs.update(tab.id, {
            pinned: !tab.pinned
        });

    if(shortcut.action.value.code === 'ADD_FAV'){
        const favoriteBar = await chrome.bookmarks.getChildren('1');

        const raccourciaFolder =
            favoriteBar.find(children => children.title === 'Raccourcia') ||
                await chrome.bookmarks.create({
                    parentId: '1',
                    title: 'Raccourcia',
                    index: 0
                });

        await chrome.bookmarks.create({
            parentId: raccourciaFolder.id,
            title: tab.title,
            url: tab.url
        });
    }
}

const processRequest = async (request) => {
    if(request.event === 'loaded'){
        const { shortcuts } = await chrome.storage.sync.get(["shortcuts"]);

        return shortcuts;
    }

    if(request.event === 'action')
        await runAction(request.shortcut);
}

chrome.runtime.onInstalled.addListener(async (details) => {
    if(details.reason === 'install'){
        await chrome.storage.sync.set({
            shortcuts: []
        });

    }else if(details.reason === 'update'){
        console.log('Updated');
    }
});

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        processRequest(request)
            .then(response => sendResponse(response));

        return true;
    }
);

export { }
