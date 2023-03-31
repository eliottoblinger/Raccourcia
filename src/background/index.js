const getCurrentTab = async () => {
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    return tabs[0];
}

const processRequest = async (request) => {
    const { shortcuts } = await chrome.storage.sync.get(["shortcuts"]);

    let { keys } = await chrome.storage.sync.get(["keys"]);

    if(request.event === 'load'){
        await chrome.storage.sync.set({
            keys: []
        });

        return null;
    }

    if(request.event === 'keyup') {
        if(keys.length === 2){
            const shortcut = shortcuts
                .find(st =>
                    Object.assign([], st.keys)
                        .sort()
                        .join(',') ===
                    keys
                        .sort()
                        .join(',')
                );

            if(shortcut) {
                await chrome.storage.sync.set({ keys: [] });
                const tab = await getCurrentTab();
                console.log(shortcut, tab.id)
                return {
                    tabId: tab.id,
                    shortcut: shortcut
                }
            }
        }

        keys.splice(keys.indexOf(request.key), 1);

        await chrome.storage.sync.set({ keys: keys });
    }

    if(request.event === 'keydown'){
        if(!keys.includes(request.key) && keys.length < 3){
            keys.push(request.key);

            await chrome.storage.sync.set({ keys: keys });
        }

        if(keys.length > 1){
            const shortcutsFound = shortcuts
                .filter(st =>
                    keys
                        .every(key => Object.assign([], st.keys).includes(key))
                );

            if(shortcutsFound.length === 1) {
                const shortcut = shortcutsFound[0];

                await chrome.storage.sync.set({ keys: [] });

                const tab = await getCurrentTab();
                console.log(shortcut, tab)
                return {
                    tabId: tab.id,
                    shortcut: shortcut
                }
            }
        }
    }

    return null;
}

chrome.runtime.onInstalled.addListener(async (details) => {
    if(details.reason === 'install'){
        await chrome.storage.sync.set({
            keys: []
        });

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

        return true; // keep the messaging channel open for sendResponse
    }
);

export { }
