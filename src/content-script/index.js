document.onkeyup = async (e) => {
    //e.preventDefault();
    //e.stopPropagation();

    await chrome.runtime.sendMessage({
        keydown: true,
        key: e.key
    });
}

document.onkeydown = async (e) => {
    //e.preventDefault();
    //e.stopPropagation();

    await chrome.runtime.sendMessage({
        keyup: true,
        key: e.key
    });
}

export { }
