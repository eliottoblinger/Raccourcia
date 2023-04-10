import { findHexColors, findRgbColors, findVarColors, rgbToHex } from "./color.js";

const isSameDomain = (styleSheet) => {
    return !styleSheet.href ?
        true :
        styleSheet.href.indexOf(window.location.origin) === 0;
};

const isStyleRule = (rule) => rule.type === 1;

const getAllCss = () => {
    return [...document.styleSheets]
        .filter(isSameDomain)
        .map(styleSheet => {
            try {
                return [...styleSheet.cssRules]
                    .filter(isStyleRule)
                    .map(rule => rule.cssText)
                    .join('');
            } catch (e) {
                console.log(`Access to stylesheet ${styleSheet.href} is denied. Ignoring...`);
            }
        })
        .filter(Boolean)
        .join('\n');
}

const getCssRootValues = () =>
    [...document.styleSheets]
        .filter(isSameDomain)
        .reduce(
            (finalArr, sheet) =>
                finalArr.concat(
                    [...sheet.cssRules].filter(isStyleRule).reduce((propValArr, rule) => {
                        const props = [...rule.style]
                            .map((propName) => [
                                propName.trim(),
                                rule.style.getPropertyValue(propName).trim()
                            ])
                            .filter(([propName]) => propName.indexOf("--") === 0);

                        return [...propValArr, ...props];
                    }, [])
                ),
            []
        );

const getAllCssColors = () => {
    const allCss = getAllCss();

    return findRgbColors(allCss)
        .map(
            rgb => rgbToHex(rgb)
        )
        .concat(
            findHexColors(allCss)
        )
        .concat(
            findVarColors(allCss, getCssRootValues())
        )
    ;

    //Améloration : ajouter la prise en compte des classes
}

export { getAllCssColors };
