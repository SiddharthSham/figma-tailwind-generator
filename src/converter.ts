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
