import {findHexColors, findRgbColors, rgbToHex} from "./color.js";

const getAllCss = () => {
    const styleSheets = [...document.styleSheets];

    return styleSheets ?? [...document.styleSheets]
        .map(styleSheet => {
            try {
                return [...styleSheet.cssRules]
                    .map(rule => rule.cssText)
                    .join('');
            } catch (e) {
                console.log(`Access to stylesheet ${styleSheet.href} is denied. Ignoring...`);
            }
        })
        .filter(Boolean)
        .join('\n');
}

const getAllCssColors = () => {
    const allCss = getAllCss();

    return findRgbColors(allCss)
        .map(
            rgb => rgbToHex(rgb)
        )
        .concat(
            findHexColors(allCss)
        )
    ;
}

export { getAllCssColors };
