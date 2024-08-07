import {
    existsSync,
    mkdirSync,
    writeFileSync,
} from 'fs'

import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';

import resolveConfig from 'tailwindcss/resolveConfig.js'
import tailwindConfig from './preset/main.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { theme } = resolveConfig(tailwindConfig)

const subsetTheme = `/* eslint-disable */
export const theme = {
    colors: ${JSON.stringify(theme.colors)},
    fontSize: ${JSON.stringify(theme.fontSize)},
    fontWeight: ${JSON.stringify(theme.fontWeight)},
    lineHeight: ${JSON.stringify(theme.lineHeight)},
    borderRadius: ${JSON.stringify(theme.borderRadius)},
    spacing: ${JSON.stringify(theme.spacing)},
    screens: ${JSON.stringify(theme.screens)},
}
`
const fullTheme = `/* eslint-disable */
export const theme = ${JSON.stringify(theme)},
`

const distDir = resolve(__dirname, './dist')

const writeFile = (content, fileName) => {
    try {
        /** check if dist dir exists, if not, create it so we can add the theme file */
        if (!existsSync(distDir)) {
            mkdirSync(distDir)
        }
        writeFileSync(join(distDir, fileName), content, 'utf-8')
    } catch (err) {
        // uh-oh, something happened here!
        console.log(err.message)
    }   
}

writeFile(subsetTheme, 'theme.ts')
writeFile(fullTheme, 'theme-full.ts')