import {fontSize, fontFamily, letterSpacing, lineHeight} from './fonts.js'
import {grid} from './grid.js'
import {colors} from './colors.js'
import {spacing} from './spacing.js'
import {radius} from './radius.js'
import fls from '@numbered/tailwind-fluid-layout-system'

export default {
	future: {
		hoverOnlyWhenSupported: true
	},
	theme: {
		spacing,
		fontSize,
		grid,
		colors,
		borderRadius: radius,
		fontFamily,
		lineHeight,
		maxWidth: {...spacing},
		minHeight: {...spacing},
		extend: {
			letterSpacing,
		}
	},
	plugins: [
		fls({
			color: 'rgba(255,0,0,0.5)',
			guidelines: false
		}),
	]
}
