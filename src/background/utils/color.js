const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

function isWhite(str) {
    // fiddle this value to set stricter rules for what is white.
    var whiteLimit = 100,
        r,g,b;

    r = parseInt("0x"+str.substring(1,3));
    g = parseInt("0x"+str.substring(3,5));
    b = parseInt("0x"+str.substring(5,7));
    if(r < whiteLimit || b < whiteLimit || g < whiteLimit) {
        return false;
    }
    return true;
}

const findHtmlColors = () => {
    const classes = document.querySelectorAll('div');

    let colors = [];

    for(const aClass of classes){
        const style = getComputedStyle(aClass);

        colors.push(rgba2hex(style.color));
        colors.push(rgba2hex(style.backgroundColor));
    }

    return colors.filter(color => color.length === 7);
}

export { findHtmlColors };
