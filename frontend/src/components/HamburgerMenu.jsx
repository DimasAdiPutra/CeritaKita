import { motion } from 'motion/react' // Pastikan pakai "framer-motion"
import clsx from 'clsx' // npm install clsx
import { useMemo } from 'react'

export default function HamburgerMenu({ onClick, isOpen, dark }) {
	// Style dasar untuk bar hamburger
	const barClass = clsx(
		'w-8 h-1 rounded-md',
		dark ? 'bg-clr-text-light' : 'bg-clr-text-dark'
	)

	// Variasi animasi untuk masing-masing bar
	const variants = useMemo(
		() => ({
			top: { rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 },
			middle: { opacity: isOpen ? 0 : 1 },
			bottom: { rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 },
		}),
		[isOpen]
	)

	return (
		<button
			onClick={onClick}
			className="flex flex-col items-center justify-center w-10 h-10 relative"
			aria-label={isOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={isOpen}>
			{/* Bar Atas */}
			<motion.span
				role="presentation"
				initial={false}
				animate={variants.top}
				transition={{ duration: 0.3 }}
				className={barClass}
			/>

			{/* Bar Tengah */}
			<motion.span
				role="presentation"
				initial={false}
				animate={variants.middle}
				transition={{ duration: 0.2 }}
				className={clsx(barClass, 'my-1')}
			/>

			{/* Bar Bawah */}
			<motion.span
				role="presentation"
				initial={false}
				animate={variants.bottom}
				transition={{ duration: 0.3 }}
				className={barClass}
			/>
		</button>
	)
}
