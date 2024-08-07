import { theme as defaultTheme } from "../config/dist/theme";

const saveConfig = async () => {
    const vars = await figma.variables.getLocalVariablesAsync()
    await figma.clientStorage.setAsync('config', JSON.stringify(defaultTheme))
    return vars
}

export const getThemeConfig = async () => {
    let savedConfig = JSON.parse(await figma.clientStorage.getAsync('config'))

    if (!savedConfig) {
        savedConfig = await saveConfig()
    }

    return defaultTheme
}

export const matchOnValue = async (prefix: string, property: string, value: any) => {
    const theme = await getThemeConfig()
    const match = Object.entries(theme[property]).find(([_, val]) => String(val) === String(value))
    if (match) return `${prefix}-${match[0]}`
    return ''
}

export const matchOnProp = async (prefix: string, property: string, value: any) => {
    const theme = await getThemeConfig()
    if (theme[property][value]) {
        return `${prefix}-${value}`
    }
    return ''
}

export const isPx = (str: string) => str.endsWith('px')
export const pxToRem = (px: number) => parseFloat((px / 16).toFixed(2))

export const isRem = (str: string) => str.endsWith('rem')
export const remToPx = (rem: number) => parseFloat((rem * 16).toFixed(2))

// converts var(--something, abc) => abc
// export const isVariable = (str: string) => str.split?.(',')?.[1]?.split?.(')')?.[0]?.trim()

const extractSimpleDefaultValue = (string) => {
    const regex = /var\(.*, ?(#?-?\w+)\)/g
    return regex.exec(string)
}

const extractComplexDefaultValue = (string) => {
    const regex = /(?:\w*)\([^()]*\)/g
    return regex.exec(string)
}

export const isVariable = (string: string) => {
    let match = extractSimpleDefaultValue(string)
    if (match === null) {
        let matchComplex = extractComplexDefaultValue(string)

        if (matchComplex === null || matchComplex[0].indexOf('var') !== -1) {
            return undefined
        }
        return matchComplex[0]
    }
    return match[1]
}

export const preprocessToPx = (value) => {
    const isVar = isVariable(value)
    if (isVar) {
        return preprocessToPx(isVar)
    }

    if (isPx(value)) {
        const pxParts = value.split('px')
        const px = parseInt(pxParts[0])
        return px
    }

    if (isRem(value)) {
        const remParts = value.split('rem')
        const rem = parseInt(remParts[0])
        return pxToRem(rem)
    }
}

export const getFrameFromNode = (node: SceneNode) => {
    let parent
    while (node.parent) {
        parent = node.parent
        if (node.parent.type === 'FRAME') break
    }
    return parent
}