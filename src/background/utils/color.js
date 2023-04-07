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

export { rgbToHex, findHexColors, findRgbColors };
