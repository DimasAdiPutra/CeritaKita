import PropTypes from 'prop-types'
import { Link } from 'react-router'
import clsx from 'clsx'
import { useMemo } from 'react'

// Base style untuk button
const BASE_STYLE =
	'px-4 py-2 rounded-md transition font-medium flex justify-center items-center gap-2'

// Variant styles (modular)
const VARIANT_STYLES = {
	primary:
		'bg-primary text-neutral-white hover:inset-shadow-sm hover:inset-shadow-neutral-darkgray',
	secondary:
		'bg-secondary text-neutral-white hover:inset-shadow-sm hover:inset-shadow-neutral-darkgray',
	neutral:
		'bg-neutral-white text-black hover:inset-shadow-sm hover:inset-shadow-neutral-darkgray',
	'primary-outline':
		'border-2 border-primary bg-transparent text-primary hover:bg-primary focus:bg-primary hover:text-neutral-white focus:text-neutral-white',
	'secondary-outline':
		'border-2 border-secondary bg-transparent text-secondary hover:bg-secondary focus:bg-secondary hover:text-neutral-white focus:text-neutral-white',
	'neutral-outline':
		'border-2 border-neutral-white bg-transparent text-neutral-white hover:bg-neutral-white focus:bg-neutral-white hover:text-black focus:text-black',
}

export default function Button({
	to,
	type = 'button',
	onClick,
	className = '',
	iconRight,
	iconLeft,
	text,
	style = 'primary',
	disabled,
}) {
	// Memoized variant style (agar tidak dibuat ulang setiap render)
	const computedClass = useMemo(
		() => clsx(BASE_STYLE, VARIANT_STYLES[style], className),
		[style, className]
	)

	const buttonContent = (
		<>
			{iconLeft}
			<span className="text-body-base">{text}</span>
			{iconRight}
		</>
	)

	return to ? (
		<Link to={to} className={computedClass} aria-disabled={disabled}>
			{buttonContent}
		</Link>
	) : (
		<button
			type={type}
			onClick={onClick}
			className={computedClass}
			disabled={disabled}>
			{buttonContent}
		</button>
	)
}

Button.propTypes = {
	to: PropTypes.string,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	onClick: PropTypes.func,
	className: PropTypes.string,
	iconLeft: PropTypes.node,
	iconRight: PropTypes.node,
	text: PropTypes.string.isRequired,
	style: PropTypes.oneOf(Object.keys(VARIANT_STYLES)), // Menggunakan keys dari VARIANT_STYLES agar lebih aman
}
