import { useStoryEditor } from '@/hooks/useStoryEditor'
import EditorToolbar from './EditorToolbar'
import ImageCropModal from '../image/imageCropModal'
import { EditorContent } from '@tiptap/react'
import CategoryBadge from '../../ui/CategoryBadge'

const StoryEditor = ({ storyId = null }) => {
  const {
    editor,
    title,
    setTitle,
    coverImage,
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
    toggleCategory,
    selectedCategories,
    categories
  } = useStoryEditor(storyId)

  const handleCoverSelect = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files?.[0]
      if (file) onSelectImage(file, 'cover')
    }
    input.click()
  }

  const handleSaveDraft = async () => {
    await saveDraft()
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat draft cerita...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* PAGE TITLE */}
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">Story Editor</h1>
      </div>

      {/* ALERTS */}
      {error && (
        <div className="m-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex items-center justify-between">
          {error}
          <button
            onClick={() => setError('')}
            className="text-red-700 hover:text-red-900"
          >
            ✕
          </button>
        </div>
      )}

      {success && (
        <div className="m-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm flex items-center justify-between">
          {success}
          <button
            onClick={() => { }}
            className="text-green-700 hover:text-green-900"
          >
            ✕
          </button>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="p-4 max-w-4xl mx-auto">
        {/* COVER IMAGE SECTION */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image *
          </label>
          <div
            onClick={handleCoverSelect}
            className="relative w-full aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer flex items-center justify-center overflow-hidden group"
          >
            {coverImage ? (
              <>
                <img
                  src={coverImage.url}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-white font-medium">Ubah Cover</span>
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-2xl mb-2">📷</p>
                <p className="text-gray-600">Klik untuk pilih cover image</p>
              </div>
            )}
          </div>
        </div>

        {/* TITLE SECTION */}
        <input
          className="w-full text-3xl font-bold mb-6 outline-none border-b pb-2 focus:border-blue-500"
          placeholder="Judul cerita..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* CATEGORY */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Kategori <span className="text-red-500">*</span>
          </label>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <CategoryBadge
                key={cat._id}
                category={cat.name}
                active={selectedCategories.includes(cat._id)}
                onClick={() => toggleCategory(cat._id)}
              />
            ))}
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Maksimal 3 kategori ({selectedCategories.length}/3)
          </p>
        </div>

        {/* TOOLBAR */}
        <EditorToolbar
          editor={editor}
          onImageClick={(file) => onSelectImage(file, 'content')}
        />

        {/* STORY CONTENT SECTION */}
        <div className="border rounded-lg p-4 bg-white focus-within:ring-2 focus-within:ring-blue-500 min-h-[600px]">
          {editor && (
            <EditorContent
              editor={editor}
              className="prose prose-sm max-w-none focus:outline-none h-full"
            />
          )}
        </div>

        {/* CHARACTER COUNT */}
        <div className="mt-2 text-sm text-gray-500 mb-8">
          {editor && `${editor.getHTML().length} karakter`}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 justify-end border-t pt-4">
          <button
            onClick={handleSaveDraft}
            disabled={savingDraft || publishing || loading}
            className="px-6 py-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 font-medium transition"
          >
            {savingDraft ? 'Menyimpan...' : 'Simpan Draft'}
          </button>
          <button
            onClick={publishCurrentStory}
            disabled={publishing || savingDraft || loading}
            className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 font-medium transition"
          >
            {publishing ? 'Mempublikasikan...' : 'Publikasikan'}
          </button>
        </div>
      </div>

      {/* CROP MODAL */}
      {cropModal?.open && (
        <ImageCropModal
          file={cropModal.file}
          onClose={closeCropModal}
          onConfirm={handleCropConfirm}
          maxFileSize={cropModal.type === 'cover' ? 3 : 2}
        />
      )}
    </>
  )
}

export default StoryEditor
