import { motion } from 'motion/react'

export default function HamburgerMenu({ onClick, isOpen, dark }) {
	return (
		<button
			onClick={onClick}
			className="flex flex-col items-center justify-center w-10 h-10 relative"
			aria-label="Toggle menu"
			aria-expanded={isOpen}>
			{/* Bar Atas */}
			<motion.span
				initial={false}
				animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
				transition={{ duration: 0.3 }}
				className={`${dark ? 'bg-black' : 'bg-neutral-white'} w-8 h-1 rounded-md`}
			/>
			{/* Bar Tengah */}
			<motion.span
				initial={false}
				animate={{ opacity: isOpen ? 0 : 1 }}
				transition={{ duration: 0.2 }}
				className={`${dark ? 'bg-black' : 'bg-neutral-white'} w-8 h-1 rounded-md my-1`}
			/>
			{/* Bar Bawah */}
			<motion.span
				initial={false}
				animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
				transition={{ duration: 0.3 }}
				className={`${dark ? 'bg-black' : 'bg-neutral-white'} w-8 h-1 rounded-md`}
			/>
		</button>
	)
}
