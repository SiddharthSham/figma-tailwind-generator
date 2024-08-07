import { Converter } from "./types"
import { matchOnProp, preprocessToPx } from "./utils"

const toClosestRound = (value) => {
    let x = preprocessToPx(value)

    const isCute = x % 2 === 0 || x % 5 === 0

    if (!isCute) {
        const closest2 = Math.ceil(x / 5) * 5
        const closest5 = Math.ceil(x / 2) * 2
        x = Math.abs(x - closest2) > Math.abs(x - closest5) ? closest5 : closest2
    }

    return x
}

export const widthConverter: Converter = (value) => {
    return matchOnProp('w', 'spacing', toClosestRound(value))
}

export const heightConverter: Converter = (value) => {
    return matchOnProp('h', 'spacing', toClosestRound(value))
}

export const marginConverter: Converter = (value) => {
    return matchOnProp('m', 'spacing', toClosestRound(value))
}

export const paddingConverter: Converter = (value) => {
    return matchOnProp('p', 'spacing', toClosestRound(value))
}

export const gapConverter: Converter = (value) => {
    return matchOnProp('gap', 'spacing', toClosestRound(value))
}