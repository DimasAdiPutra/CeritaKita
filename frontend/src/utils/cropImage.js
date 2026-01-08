export const getCroppedImage = async (file, crop, options) => {
	const image = new Image()
	image.src = URL.createObjectURL(file)

	await new Promise((resolve) => (image.onload = resolve))

	const canvas = document.createElement('canvas')
	const scale = options.maxWidth / crop.width

	canvas.width = Math.min(options.maxWidth, crop.width)
	canvas.height = crop.height * scale

	const ctx = canvas.getContext('2d')
	ctx.drawImage(
		image,
		crop.x,
		crop.y,
		crop.width,
		crop.height,
		0,
		0,
		canvas.width,
		canvas.height
	)

	return new Promise((resolve) =>
		canvas.toBlob((blob) => resolve(blob), 'image/jpeg', options.quality)
	)
}
