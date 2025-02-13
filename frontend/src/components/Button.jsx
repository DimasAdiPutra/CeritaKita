import PropTypes from 'prop-types'
import { Link } from 'react-router'

export default function Button({
	to,
	type = 'button',
	onClick,
	className = '',
	iconRight,
	iconLeft,
	text,
	style = 'primary',
}) {
	const variantStyle = {
		primary:
			'bg-primary text-neutral-white hover:inset-shadow-sm hover:inset-shadow-neutral-darkgray',
		secondary:
			'bg-secondary text-neutral-white hover:inset-shadow-sm  hover:inset-shadow-neutral-darkgray',
		neutral:
			'bg-neutral-white text-black hover:inset-shadow-sm  hover:inset-shadow-neutral-darkgray',
		'primary-outline':
			'border-2 border-primary bg-transparent text-primary hover:bg-primary focus:bg-primary hover:text-neutral-white focus:text-neutral-white',
		'secondary-outline':
			'border-2 border-secondary bg-transparent text-secondary hover:bg-secondary focus:bg-secondary  hover:text-neutral-white focus:text-neutral-white',
		'neutral-outline':
			'border-2 border-neutral-white bg-transparent text-neutral-white hover:bg-neutral-white focus:bg-neutral-white  hover:text-black focus:text-black',
	}

	const baseStyle =
		'px-4 py-2 rounded-md transition font-medium flex justify-center items-center gap-2 transition'

	return to ? (
		// Jika terdapat props to, maka gunakan link, jika tidak gunakan button
		<Link
			to={to}
			className={`${baseStyle} ${variantStyle[style]} ${className}`}>
			{iconLeft && iconLeft}

			<span className="text-body-base">{text}</span>

			{iconRight && iconRight}
		</Link>
	) : (
		<button
			type={type}
			onClick={onClick}
			className={`${baseStyle} ${variantStyle[style]} ${className}`}>
			{iconLeft && iconLeft}

			<span>{text}</span>

			{iconRight && iconRight}
		</button>
	)
}

Button.propTypes = {
	style: PropTypes.oneOf([
		'primary',
		'secondary',
		'neutral',
		'primary-outline',
		'secondary-outline',
		'neutral-outline',
	]),
}
