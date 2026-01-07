import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { uploadToImageKit } from '@/services/imagekit.api'
import { saveImageMeta, updateImageStatus } from '@/services/image.api'
import {
	updateStory,
	publishStory,
	createStory,
	getStoryById,
} from '@/services/stories.api'
import { getCategories } from '@/services/categories.api'

export const useStoryEditor = (initialStoryId = null) => {
	const navigate = useNavigate()
	// ✅ Initialize dengan initialStoryId
	const [storyId, setStoryId] = useState(initialStoryId)
	const [title, setTitle] = useState('')
	const [coverImage, setCoverImage] = useState(null)
	const [contentImages, setContentImages] = useState([])
	const [loading, setLoading] = useState(false)
	const [cropModal, setCropModal] = useState({
		open: false,
		file: null,
		type: 'content',
	})
	const [savingDraft, setSavingDraft] = useState(false)
	const [publishing, setPublishing] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [selectedCategories, setSelectedCategories] = useState([])
	const [categories, setCategories] = useState([])

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				link: false,
				underline: false,
			}),
			Link.configure({
				openOnClick: false,
				autolink: true,
				linkOnPaste: true,
			}),
			Underline,
			Image.configure({
				allowBase64: true,
				HTMLAttributes: {
					class: 'rounded-lg max-w-full h-auto',
				},
			}),
		],
		content: '',
	})

	/**
	 * Sync storyId dengan initialStoryId
	 */
	useEffect(() => {
		setStoryId(initialStoryId)
	}, [initialStoryId])

	/**
	 * Load story data jika ada initialStoryId
	 */
	useEffect(() => {
		const loadStoryData = async (id) => {
			setLoading(true)
			setError('')

			try {
				const story = await getStoryById(id)

				// Set all data dari response
				setTitle(story.title)

				// Set cover image jika ada
				if (story.coverImage) {
					setCoverImage({
						url: story.coverImage.url,
						id: story.coverImage.fileId,
					})
				}

				// Set editor content
				if (editor && story.contentJSON) {
					editor.commands.setContent(story.contentJSON)
				}

				// Set content images dari contentHTML atau dari image metadata
				if (story.contentImages) {
					setContentImages(story.contentImages)
				}

				setSelectedCategories(story.categories.map((cat) => cat._id))

				console.log('Story loaded:', story)
			} catch (err) {
				setError('Gagal memuat draft. Silakan coba lagi.')
				console.error('loadStoryData error', err)
			} finally {
				setLoading(false)
			}
		}

		// ✅ Load data hanya jika ada initialStoryId
		if (initialStoryId && editor) {
			loadStoryData(initialStoryId)
		}
	}, [initialStoryId, editor])

	// Load Category
	useEffect(() => {
		let isMounted = true // anti memory leak

		const loadCategories = async () => {
			try {
				const data = await getCategories()
				if (isMounted) {
					setCategories(data)
				}
			} catch (err) {
				if (isMounted) {
					setError('Gagal mengambil kategori')
					console.error(err)
				}
			} finally {
				if (isMounted) {
					setLoading(false)
				}
			}
		}

		loadCategories()

		return () => {
			isMounted = false
		}
	}, [])

	/**
	 * Extract excerpt dari HTML content
	 * Ambil plain text tanpa HTML tags, max 150 karakter
	 */
	const extractExcerpt = (html) => {
		if (!html) return ''

		// Remove HTML tags
		let plainText = html.replace(/<[^>]*>/g, '').trim()

		// Replace newlines and multiple spaces with single space
		plainText = plainText.replace(/\n/g, ' ').replace(/\s+/g, ' ')

		// Limit to 150 characters and add ellipsis if needed
		return plainText.length > 150
			? plainText.substring(0, 150) + '...'
			: plainText
	}

	const onSelectImage = (file, type = 'content') => {
		setCropModal({ open: true, file, type })
	}

	const closeCropModal = () => {
		setCropModal({ open: false, file: null, type: 'content' })
	}

	const handleCropConfirm = async (blob) => {
		const type = cropModal.type

		try {
			// 1️⃣ Upload ke ImageKit
			const image = await uploadToImageKit(
				blob,
				`story-${type}-${Date.now()}.jpg`
			)

			// 2️⃣ Simpan metadata dengan info lengkap
			const imageType = type === 'cover' ? 'cover' : 'embed'
			await saveImageMeta({
				fileId: image.fileId,
				url: image.url,
				type: imageType,
				width: image.width,
				height: image.height,
				size: blob.size,
				mimeType: blob.type,
			})

			// 3️⃣ Handle berdasarkan type
			if (type === 'cover') {
				setCoverImage({ url: image.url, id: image.fileId })
			} else if (type === 'content' && editor) {
				editor.chain().focus().setImage({ src: image.url }).run()
				setContentImages((prev) => [...prev, image.fileId])
			}
		} catch (err) {
			setError('Gagal upload gambar. Silakan coba lagi.')
			console.error('handleCropConfirm error', err)
		} finally {
			closeCropModal()
		}
	}

	/**
	 * Save Draft
	 */
	const saveDraft = async () => {
		if (!title.trim()) {
			setError('Judul cerita tidak boleh kosong')
			return
		}

		if (!editor || !editor.getHTML().trim()) {
			setError('Konten cerita tidak boleh kosong')
			return
		}

		console.log(selectedCategories)

		setSavingDraft(true)
		setError('')
		setSuccess('')

		try {
			const contentHTML = editor.getHTML()
			const contentJSON = editor.getJSON()
			const excerpt = extractExcerpt(contentHTML)
			const categories = [...selectedCategories]

			console.log('Categories', categories)

			const payload = {
				title: title.trim(),
				excerpt,
				contentHTML,
				contentJSON,
				coverImage: coverImage
					? { fileId: coverImage.id, url: coverImage.url }
					: null,
				categories,
			}

			let response
			// ✅ Check storyId (dari state), bukan initialStoryId
			if (storyId) {
				// Update existing story
				response = await updateStory(storyId, payload)
			} else {
				// Create new story
				response = await createStory(payload)
				// Set storyId dari response
				console.log(response)
				if (response?.id) {
					setStoryId(response.id)
					// Navigasi ke URL dengan story ID
					navigate(`/editor/${response.id}`, { replace: true })
				}
			}

			setSuccess('Draft berhasil disimpan')
			console.log('Draft saved:', response)
			return response
		} catch (err) {
			setError('Gagal menyimpan draft. Silakan coba lagi.')
			console.error('saveDraft error', err)
		} finally {
			setSavingDraft(false)
		}
	}

	/**
	 * Publish Story
	 */
	const publishCurrentStory = async () => {
		if (!title.trim()) {
			setError('Judul cerita tidak boleh kosong')
			return
		}

		if (!editor || !editor.getHTML().trim()) {
			setError('Konten cerita tidak boleh kosong')
			return
		}

		if (!coverImage?.id) {
			setError('Cover image harus dipilih')
			return
		}

		setPublishing(true)
		setError('')
		setSuccess('')

		try {
			let finalStoryId = storyId
			const contentHTML = editor.getHTML()
			const contentJSON = editor.getJSON()
			const excerpt = extractExcerpt(contentHTML)

			// Jika belum ada storyId, buat story baru terlebih dahulu
			if (!storyId) {
				const createResponse = await createStory({
					title: title.trim(),
					excerpt,
					contentHTML,
					contentJSON,
					coverImage: { fileId: coverImage.id, url: coverImage.url },
				})
				finalStoryId = createResponse.id
				setStoryId(finalStoryId)
			} else {
				// Update jika sudah ada
				await updateStory(storyId, {
					title: title.trim(),
					excerpt,
					contentHTML,
					contentJSON,
					coverImage: { fileId: coverImage.id, url: coverImage.url },
				})
			}

			// Mark all images as used
			await markImagesAsUsed(finalStoryId)

			// Publish story
			const publishResponse = await publishStory(finalStoryId)

			setSuccess('Cerita berhasil dipublikasikan!')
			console.log('Story published:', publishResponse)

			// Navigasi ke halaman cerita yang sudah dipublikasikan
			navigate(`/story/${finalStoryId}`, { replace: true })

			return publishResponse
		} catch (err) {
			setError('Gagal mempublikasikan cerita. Silakan coba lagi.')
			console.error('publishCurrentStory error', err)
		} finally {
			setPublishing(false)
		}
	}

	/**
	 * Mark all images as 'used' when story is published
	 */
	const markImagesAsUsed = async (storyIdToUse) => {
		try {
			const imageIds = []

			// Add cover image
			if (coverImage?.id) {
				imageIds.push(coverImage.id)
			}

			// Add content images
			imageIds.push(...contentImages)

			// Update status untuk semua images
			await Promise.all(
				imageIds.map((fileId) =>
					updateImageStatus(fileId, storyIdToUse, 'used')
				)
			)

			console.log('All images marked as used')
		} catch (err) {
			console.error('markImagesAsUsed error', err)
			throw err
		}
	}

	// Category Badge
	const toggleCategory = (cat) => {
		setSelectedCategories((prev) => {
			if (prev.includes(cat)) {
				// remove
				return prev.filter((c) => c !== cat)
			}

			if (prev.length >= 3) {
				// max 3, stop right there ✋
				return prev
			}

			return [...prev, cat]
		})
	}

	return {
		storyId,
		editor,
		title,
		setTitle,
		coverImage,
		setCoverImage,
		onSelectImage,
		cropModal,
		closeCropModal,
		handleCropConfirm,
		saveDraft,
		publishCurrentStory,
		savingDraft,
		publishing,
		loading,
		error,
		success,
		setError,
		setSuccess,
		toggleCategory,
		selectedCategories,
		categories,
	}
}
