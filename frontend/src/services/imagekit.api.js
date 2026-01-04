import api from './api'
import ImageKit from 'imagekit-javascript'

const imagekit = new ImageKit({
	publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
	urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
})

/**
 * Upload image langsung ke ImageKit
 */
export const uploadToImageKit = async (file, fileName) => {
	const authRes = await api.get('/imagekit/auth')

	const result = await imagekit.upload({
		file,
		fileName,
		...authRes.data,
	})

	return {
		fileId: result.fileId,
		url: result.url,
		width: result.width,
		height: result.height,
		size: result.size,
		mimeType: result.mimeType,
	}
}
