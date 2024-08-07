import { Converter } from "./types"
import { matchOnValue } from "./utils"

export const backgroundColorConverter: Converter = (value) => {
    const hexcode = value.match(/[a-f0-9]{6}/gi)?.[0]
    if (hexcode) {
        return matchOnValue('bg', 'colors', `#${hexcode}`)
    }

    return ''
}