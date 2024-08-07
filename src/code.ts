import { getFrameFromNode } from "converters/utils";
import { convert } from "./converter";

console.clear();

figma.codegen.on("generate", async ({ node }) => {
    const css = await node.getCSSAsync();

    const frame = getFrameFromNode(node)
    const ctx = {
        width: frame?.width
    }

    console.log("css:", css);
    const transformed = await convert(css, ctx);

    return [
        {
            title: "Tailwind",
            code: transformed,
            language: "PLAINTEXT",
        },
    ];
});
