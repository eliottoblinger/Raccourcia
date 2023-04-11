const rgba2hex = (rgba) => {
    return `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;
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
