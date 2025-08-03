import PropTypes from 'prop-types'
import { Link } from 'react-router'
import clsx from 'clsx'
import { useMemo } from 'react'

const BASE_STYLE =
	'px-4 py-2 rounded-md transition font-medium flex justify-center items-center gap-2 cursor-pointer'

const VARIANT_STYLES = {
	primary: 'bg-clr-primary text-clr-text-dark hover:bg-clr-primary-hover',
	secondary: 'bg-clr-secondary text-clr-text-dark hover:bg-clr-secondary-hover',
	tertiary: 'bg-clr-tertiary text-clr-text-light hover:bg-clr-tertiary-hover',
	'primary-outline':
		'border-2 border-clr-primary bg-transparent text-clr-primary hover:bg-clr-primary-hover focus:bg-clr-primary-active hover:text-clr-text-dark focus:text-clr-text-dark',
	'secondary-outline':
		'border-2 border-clr-secondary bg-transparent text-clr-secondary hover:bg-clr-secondary focus:bg-clr-secondary hover:text-clr-text-dark focus:text-clr-text-dark',
	'tertiary-outline':
		'border-2 border-clr-tertiary bg-transparent text-clr-tertiary hover:bg-clr-tertiary focus:bg-clr-tertiary hover:text-clr-text-light focus:text-clr-text-light',
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
	ariaLabel, // tambahkan ini
}) {
	const computedClass = useMemo(
		() => clsx(BASE_STYLE, VARIANT_STYLES[style], className),
		[style, className]
	)

	// Tentukan aria-label yang dipakai
	const accessibleLabel = ariaLabel || text || undefined

	const buttonContent = (
		<>
			{iconLeft}
			{text && <span className="text-body-base">{text}</span>}
			{iconRight}
		</>
	)

	return to ? (
		<Link
			to={to}
			className={computedClass}
			aria-label={accessibleLabel}
			aria-disabled={disabled}
			role="button" // ini penting kalau pakai <Link> sebagai button
		>
			{buttonContent}
		</Link>
	) : (
		<button
			type={type}
			onClick={onClick}
			className={computedClass}
			disabled={disabled}
			aria-label={accessibleLabel}
		>
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
	text: PropTypes.string, // biarkan optional, karena icon-only button kadang dipakai
	style: PropTypes.oneOf(Object.keys(VARIANT_STYLES)),
	ariaLabel: PropTypes.string, // tambahkan ini
}
