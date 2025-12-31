export const getImageKitPath = (url = '') => {
	if (!url) return ''
	const base = 'ik.imagekit.io/dimasadiputra/'
	const idx = url.indexOf(base)
	return idx !== -1 ? url.slice(idx + base.length) : ''
}
