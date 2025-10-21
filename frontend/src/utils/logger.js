export const dglog = (...args) => {
	if (import.meta.env.MODE === 'development') {
		console.log(...args)
	}
}

export const dgerror = (...args) => {
	if (import.meta.env.MODE === 'development') {
		console.error(...args)
	}
}

export const dgwarn = (...args) => {
	console.warn(...args)
}
