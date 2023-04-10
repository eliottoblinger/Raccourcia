const rgbToHex = (rgb) => {
    return '#' +
        rgb
            .slice(4,-1)
            .split(',')
            .map(x => (+x)
                .toString(16)
                .padStart(2,0)
            )
            .join('')
}

const findHexColors = (str) => {
    return str.match(/#([A-Fa-f0-9]{6})/g);
}

const findRgbColors = (str) => {
    return str.match(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/g);
}

const findVarColors = (str, cssRootValues) => {
    const rootVariables = str.match(/var\(([a-z-0-9,\s]+)\)/g);

    if(!rootVariables)
        return [];

    let colors = [];

    for(const rootVariable of rootVariables){
        const cssValueFound = cssRootValues.find(value => value[0] === rootVariable.replace(/var\(([a-z-0-9,\s]+)\)/g, '$1'));

        if(cssValueFound){
            const color = cssValueFound[1];

            if (/#([A-Fa-f0-9]{6})/.test(color)){
                colors.push(color);
                continue;
            }

            if(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.test(color))
                colors.push(rgbToHex(color));
        }
    }

    return colors;
}

export { rgbToHex, findHexColors, findRgbColors, findVarColors };
