import { Converter } from "./types"
import { isVariable, matchOnValue } from "./utils"

export const borderRadiusConverter: Converter = (value) => {
    const isVar = isVariable(value)
    if (isVar) {
        return borderRadiusConverter(isVar)
    }

    return matchOnValue('rounded', 'borderRadius', value)
}