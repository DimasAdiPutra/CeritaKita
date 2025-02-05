import PropTypes from 'prop-types'

const Input = ({
	label,
	showLabel,
	text = '',
	id,
	type,
	iconLeft,
	iconRight,
	// inputClassName = '',
	// labelClassName = '',
	transparent,
}) => {
	return (
		<div className={!showLabel && 'relative'}>
			<label
				htmlFor={id}
				className={
					showLabel
						? `block text-body-small-base font-medium ${
								transparent ? 'text-neutral-white' : ' text-neutral-darkgray'
						  }`
						: 'sr-only'
				}>
				{label}
			</label>

			<span className="pointer-events-none absolute inset-y-0 start-0 grid w-10 place-content-center">
				{iconLeft && iconLeft}
			</span>

			<input
				type={type}
				id={id}
				placeholder={text}
				className={`${
					iconLeft && 'pl-10'
				} w-full rounded-md border-2 focus:border-primary focus:ring-0 focus:outline-0 py-2.5 pe-10 shadow-xs sm:text-body-small-base transition-colors ${
					transparent
						? 'bg-transparent border-neutral-white placeholder:text-neutral-white'
						: 'bg-neutral-white border-neutral-darkgray placeholder:text-neutral-darkgray'
				}`}
			/>

			<span className="sr-only">{text}</span>

			<span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center">
				{iconRight && iconRight}
			</span>
		</div>
	)
}

Input.propTypes = {
	type: PropTypes.oneOf(['text', 'search', 'email', 'password']).isRequired,
}

export default Input
