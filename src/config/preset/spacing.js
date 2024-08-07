const regularSpacing = new Array(450).fill(null).reduce((result, item, i) => {
	if (i % 2 === 0 || i % 5 === 0 || i < 100) {
		result[i] = i < 4 ? `${i}px` : `${i / 16}rem`
	}
	return result
}, {})

const largeSpecificSpacing = [205, 280, 600, 700, 1400].reduce((result, item) => {
	result[item] = `${item / 16}rem`
	return result
}, {})

const spacing = {
	...regularSpacing,
	...largeSpecificSpacing
}

export {spacing}
