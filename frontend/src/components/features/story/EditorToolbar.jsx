const EditorToolbar = ({ editor, onImageClick }) => {
  if (!editor) return null

  const handleImageSelect = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files?.[0]
      if (file) onImageClick(file)
    }
    input.click()
  }

  const ToolbarButton = ({ onClick, isActive, title, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 rounded text-sm transition ${isActive
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      title={title}
    >
      {children}
    </button>
  )

  return (
    <div className="bg-white border rounded-lg p-3 mb-4 space-y-2">
      {/* Heading Section */}
      <div className="flex gap-1 border-b pb-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          isActive={editor.isActive('heading', { level: 4 })}
          title="Heading 4"
        >
          H4
        </ToolbarButton>
      </div>

      {/* Text Formatting Section */}
      <div className="flex gap-1 border-b pb-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Strikethrough"
        >
          <s>S</s>
        </ToolbarButton>
      </div>

      {/* Lists & Blocks Section */}
      <div className="flex gap-1 border-b pb-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Ordered List"
        >
          1. List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="Code Block"
        >
          &lt;/&gt;
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Quote"
        >
          &quot; 
        </ToolbarButton>
      </div>

      {/* Links & Media Section */}
      <div className="flex gap-1">
        <ToolbarButton
          onClick={handleImageSelect}
          title="Insert Image"
        >
          🖼️ Image
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const url = window.prompt('Masukan URL link:')
            if (url) {
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
            }
          }}
          isActive={editor.isActive('link')}
          title="Insert Link"
        >
          🔗 Link
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Line"
        >
          ━━━
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().clearNodes().run()}
          title="Clear Formatting"
        >
          🗑️ Clear
        </ToolbarButton>
      </div>
    </div>
  )
}

export default EditorToolbar
