import { backgroundColorConverter } from "./background"
import { borderRadiusConverter } from "./border"
import { alignItemsConverter, displayConverter, flexDirectionConverter, justifyContentConverter } from "./layout"
import { gapConverter, heightConverter, marginConverter, paddingConverter, widthConverter } from "./spacing"
import { DefaultConverter } from "./types"
import { fontSizeConverter, fontStyleConverter, fontWeightConverter, lineHeightConverter, textAlignConverter, textColorConverter } from "./typography"
import { getThemeConfig, preprocessToPx } from "./utils"

export const postprocess = async (className, ctx) => {
    const theme = await getThemeConfig()
    const isLg = ctx.width ? (ctx.width > preprocessToPx(theme.screens.sm)) : false
    return `${isLg ? 'lg:' : ''}${className}`
}

const defaultConverter: DefaultConverter = async (key, value) => {
    return `[${key}:${value.replace(/\s/g, '')}]`
}

export const converters = {
    default: defaultConverter,

    // typography
    'font-size': fontSizeConverter,
    'font-weight': fontWeightConverter,
    'text-align': textAlignConverter,
    'line-height': lineHeightConverter,
    'font-style': fontStyleConverter,
    'color': textColorConverter,

    // layout
    'flex-direction': flexDirectionConverter,
    'align-items': alignItemsConverter,
    'justify-content': justifyContentConverter,
    'display': displayConverter,

    // background
    'background': backgroundColorConverter,

    // border
    'border-radius': borderRadiusConverter,

    // spacings
    'width': widthConverter,
    'height': heightConverter,
    'gap': gapConverter,
    'padding': paddingConverter,
    'margin': marginConverter,
}
