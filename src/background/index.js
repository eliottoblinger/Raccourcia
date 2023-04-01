const getCurrentTab = async () => {
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    return tabs[0];
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

    if(request.event === 'openTab'){
        const url = request.url.trim() === '' ?
            'chrome://new-tab-page/' :
            request.url;

        const { index } = await getCurrentTab();

        chrome.tabs.create({
            index: index+1,
            url: url,
            active: true
        });
    }

    if(request.event === 'duplicateTab'){
        const { id } = await getCurrentTab();

        chrome.tabs.duplicate(id);
    }

    if(request.event === 'closeTab'){
        const { id } = await getCurrentTab();

        chrome.tabs.remove(id);
    }
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
