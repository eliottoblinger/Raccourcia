window.addEventListener('load', async () => {
    await chrome.runtime.sendMessage({
        event: 'load',
    });
})

document.onkeyup = async (e) => {
    //e.preventDefault();

    const response = await chrome.runtime.sendMessage({
        event: 'keyup',
        key: e.key
    });

    console.log(response)
}

document.onkeydown = async (e) => {
    //e.preventDefault();

    const response = await chrome.runtime.sendMessage({
        event: 'keydown',
        key: e.key
    });

    console.log(response)

    /*
    const insertPromise = await chrome.scripting.insertCSS({
        files: ["style.css"],
        target: { tabId: tab.id }
    });
     */
}

export { }
