// import { TailwindConverter } from "css-to-tailwindcss";
// import { CssToTailwindTranslator } from "css-to-tailwind-translator";
// const Css = require('json-to-css')
import { converters, postprocess } from "./converters";

const supportedProps = Object.keys(converters);

const convertRule = async (key, value, ctx) => {
    let converted

    if (supportedProps.includes(key)) {
        converted = await converters[key](value, ctx);
    }

    if (!converted) return undefined;

    const postprocessed = await postprocess(converted, ctx)
    return postprocessed;
};

export const convert = async (rules: Record<string, string>, ctx) => {
    const transformed = (await Promise.all(Object.entries(rules)
        .map(async ([key, value]) => {
            const converted = await convertRule(key, value, ctx);

            if (!converted) {
                console.log("skipped:", { key, value });
                return undefined
            }

            return converted;
        })))
        .filter(Boolean)
        .join(" ");

    return transformed;
};

// export const convert = async (rules, ctx) => {
//     const theme = await getThemeConfig()
//     const css = Css.of({ twg: rules })
//     const conversionResult = CssToTailwindTranslator(css, { customTheme: theme });
//     console.log({ css, conversionResult })
//     return conversionResult.data?.[0]?.resultVal || ''
// }

// export const convert = async (rules, ctx) => {
//     const theme = await getThemeConfig()
//     const css = Css.of({ twg: Object.entries(rules).map(([key, value]) => ({ [key]: isVariable(value as string) || value })) })
//     const converter = new TailwindConverter({
//         remInPx: 16,
//         tailwindConfig: {
//             content: [],
//             theme: theme,
//         },
//     });

//     const converted = await converter.convertCSS(css)
//     console.log(converted.nodes[0]?.tailwindClasses.join(' '))
//     return converted.nodes[0]?.tailwindClasses.join(' ') || ''
// }