import Cropper from 'react-easy-crop'
import { useState } from 'react'
import { getCroppedImage } from '@/utils/cropImage'

const ImageCropModal = ({ file, onClose, onConfirm, maxFileSize = 2 }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState(16 / 9) // Default 16:9
  const [croppedArea, setCroppedArea] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Preset aspect ratios
  const aspectPresets = [
    { label: '1:1 (Square)', value: 1 },
    { label: '16:9 (Landscape)', value: 16 / 9 },
    { label: '4:3 (Standard)', value: 4 / 3 },
    { label: '9:16 (Portrait)', value: 9 / 16 },
    { label: '3:2 (Photo)', value: 3 / 2 },
  ]

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels)
  }

  const handleAspectChange = (newAspect) => {
    setAspect(newAspect)
  }

  const handleConfirm = async () => {
    if (!croppedArea) {
      setError('Silakan crop gambar terlebih dahulu')
      return
    }

    setLoading(true)
    setError('')

    try {
      const blob = await getCroppedImage(file, croppedArea, {
        maxWidth: 1200,
        quality: 0.8,
      })

      // Validasi file size (dalam MB)
      const fileSizeMB = blob.size / (1024 * 1024)
      if (fileSizeMB > maxFileSize) {
        setError(`Ukuran file terlalu besar. Maksimal ${maxFileSize}MB`)
        return
      }

      onConfirm(blob)
    } catch (err) {
      setError('Gagal crop gambar. Silakan coba lagi.')
      console.error('Crop error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Crop Gambar</h2>

        {/* Aspect Ratio Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pilih Aspect Ratio
          </label>
          <div className="grid grid-cols-3 gap-2">
            {aspectPresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handleAspectChange(preset.value)}
                className={`px-3 py-2 rounded text-sm font-medium transition ${aspect === preset.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cropper Container */}
        <div className="relative h-80 bg-gray-100 rounded mb-4 overflow-hidden">
          <Cropper
            image={URL.createObjectURL(file)}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Zoom Slider */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Zoom: {zoom.toFixed(1)}x
          </label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* File Size Info */}
        <p className="text-xs text-gray-500 mb-4">
          Maksimal ukuran file: {maxFileSize}MB
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded border hover:bg-gray-50 disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Pakai Gambar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageCropModal
