const getCurrentTab = async () => {
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    return tabs[0];
}

chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
        const { shortcuts } = await chrome.storage.sync.get(["shortcuts"]);

        let {keys} = await chrome.storage.local.get(["keys"]);

        let {keysInvalid} = await chrome.storage.local.get(["keysInvalid"]);

        if(request.keyup) {
            if(keys.length === 3)
                await chrome.storage.local.set({ keysInvalid: true });

            if(keys.length === 2 && !keysInvalid){
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
                    await chrome.storage.local.set({ keys: [] });
                    const tab = await getCurrentTab();
                    console.log(tab)
                    return;
                }
            }

            keys.splice(keys.indexOf(request.key), 1);

            await chrome.storage.local.set({ keys: keys });
        }

        if(request.keydown){
            await chrome.storage.local.set({ keysInvalid: false });

            if(!keys.includes(request.key) && keys.length < 3){
                keys.push(request.key);
                await chrome.storage.local.set({ keys: keys });
                const response = await chrome.storage.local.get(["keys"]);

                keys = response.keys;
            }

            if(keys.length > 1){
                const shortcutsFound = shortcuts
                    .filter(st =>
                        keys
                            .every(key => Object.assign([], st.keys).includes(key))
                    );

                if(shortcutsFound.length === 1) {
                    const shortcut = shortcutsFound[0];

                    await chrome.storage.local.set({ keys: [] });

                    const tab = await getCurrentTab();
                    console.log(tab)
                }
            }
        }
    }
);

export { }
