import PropTypes from 'prop-types'
import clsx from 'clsx' // Pastikan install: npm install clsx
import React from 'react'

const Input = React.forwardRef(function Input({
	label,
	showLabel = false,
	text = '',
	id,
	type = 'text',
	iconLeft,
	iconRight,
	transparent = false,
	className = '',
	...props
}, ref) {
	return (
		<div className={clsx({ relative: !showLabel })}>
			{showLabel && (
				<label
					htmlFor={id}
					className={clsx(
						'block text-body-small-base font-medium',
						transparent ? 'text-clr-text-dark' : 'text-clr-text-light'
					)}>
					{label}
				</label>
			)}

			<div className="relative">
				{iconLeft && (
					<span className="pointer-events-none absolute inset-y-0 start-0 grid w-10 place-content-center">
						{iconLeft}
					</span>
				)}

				<input
					ref={ref}
					type={type}
					id={id}
					placeholder={text}
					className={clsx(
						'w-full rounded-md border-2 py-2.5 pe-10 shadow-xs sm:text-body-small-base transition-colors focus:border-clr-primary focus:ring-0 focus:outline-0',
						{
							'pl-10': iconLeft,
							'bg-transparent border-clr-container-light text-clr-text-dark placeholder:text-clr-text-dark':
								transparent,
							'bg-neutral-white border-clr-container-dark text-clr-text-light placeholder:text-clr-text-light':
								!transparent,
						},
						className
					)}
					{...props}
				/>

				{iconRight && (
					<span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center">
						{iconRight}
					</span>
				)}
			</div>
		</div>
	)
})

Input.propTypes = {
	label: PropTypes.string,
	showLabel: PropTypes.bool,
	text: PropTypes.string,
	id: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['text', 'email', 'password']),
	iconLeft: PropTypes.node,
	iconRight: PropTypes.node,
	transparent: PropTypes.bool,
	className: PropTypes.string,
}

export default Input