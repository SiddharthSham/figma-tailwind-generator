import { Converter } from "./types"
import { matchOnProp, matchOnValue } from "./utils"

// TODO: Handle different units
export const fontSizeConverter: Converter = (value) => {
    const isPx = value.split('px')
    const val = Math.round(parseFloat(isPx[0])).toString()
    return matchOnProp('text', 'fontSize', val)
}

export const fontWeightConverter: Converter = (value) => {
    if (parseInt(`${value}`) === 400) return ''
    return matchOnValue('font', 'fontWeight', value)
}

export const textColorConverter: Converter = (value) => {
    const hexcode = value.match(/[a-f0-9]{6}/gi)?.[0]
    if (hexcode) {
        return matchOnValue('text', 'colors', `#${hexcode}`)
    }
    return ''
}

export const textAlignConverter: Converter = (value) => {
    return `text-${value}`
}

export const lineHeightConverter: Converter = (value) => {
    const x = value.split('%')[0]
    const ptValue = parseFloat(x) / 100
    return matchOnValue('leading', 'lineHeight', ptValue)
}

export const fontStyleConverter: Converter = (value) => {
    if (value === 'italic') return 'italic'
    return ''
}