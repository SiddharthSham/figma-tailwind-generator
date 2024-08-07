const fontFamily = {
	serif: ['MessinaSerif', 'serif'],
	sans: ['MessinaSans', 'sans-serif'],
	mono: ['MessinaSansMono', 'monospace'],
}

const MIN_SIZE = 11
const MAX_SIZE = 26
const largeSpecificSizing = [260, 120, 85, 75, 60, 45, 35]

const letterSpacing = {
	tightest: '-.06em',
	tighter: '-.04em',
	tight: '-.02em',
	normal: '0',
	wide: '.02em',
	wider: '.04em',
	widest: '.06em'
}

const lineHeight = {
	narrowest: '0.8',
	narrower: '0.9',
	none: '1',
	narrow: '1.1',
	tightest: '1.2',
	tighter: '1.3',
	tight: '1.4',
	snug: '1.45',
	normal: '1.50',
	relaxed: '1.6',
	wide: '1.7',
	wider: '1.8',
	widest: '1.9'
}

const regularSizing = new Array(MAX_SIZE - MIN_SIZE).fill(null).map((item, idx) => idx + MIN_SIZE)
const sizes = [...regularSizing, ...largeSpecificSizing]

const precision = (value, floats = 2) => {
	const pow = 10 ** floats
	return ~~(value * pow) / pow
}

const max = px => {
	return `max(${px}px,${precision(px / 16)}rem)`
}

const fontSize = sizes.reduce((result, size) => {
	result[size] = max(size)
	return result
}, {})

export { fontSize, fontFamily, letterSpacing, lineHeight, sizes }
