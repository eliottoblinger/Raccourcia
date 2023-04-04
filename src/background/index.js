const getCurrentTab = async () => {
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    return tabs[0];
}

const runAction = async (action, strategy, instruction) => {
    const tab = await getCurrentTab();

    if(action.code === 'NEW_TAB'){
        const url = strategy.id === 1 || instruction.trim() === '' ?
            'chrome://new-tab-page/' :
            instruction;

        chrome.tabs.create({
            index: tab.index+1,
            url: url,
            active: true
        });
    }

    if(action.code === 'DUP_TAB')
        chrome.tabs.duplicate(tab.id);

    if(action.code === 'CLO_TAB')
        chrome.tabs.remove(tab.id);

    if(action.code === 'PIN_TAB')
        chrome.tabs.update(tab.id, {
            pinned: !tab.pinned
        });

    if(action.code === 'ADD_FAV'){
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

    if(request.event === 'askTabId'){
        const tab = await getCurrentTab();

        return tab.id;
    }

    if(request.event === 'action')
        await runAction(request.action, request.strategy, request.instruction);
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
