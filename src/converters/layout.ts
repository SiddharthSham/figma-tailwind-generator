import { Converter } from "./types"

export const displayConverter: Converter = (value) => {
    return `${value}`
}

export const flexDirectionConverter: Converter = (value) => {
    if (value === 'column') return `flex-col`
    else return `flex-row`
}

export const alignItemsConverter: Converter = (value) => {
    return `items-${value}`
}

export const justifyContentConverter: Converter = (value) => {
    const map = {
        'normal': 'normal',
        'flex-start': 'start',
        'flex-end': 'end',
        'center': 'center',
        'space-between': 'between',
        'space-around': 'around',
        'space-evenly': 'evenly',
        'stretch': 'stretch',
    }
    if (map[value]) return `justify-${map[value]}`
    return ''
}
