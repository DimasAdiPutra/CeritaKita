import PropTypes from 'prop-types'
import clsx from 'clsx' // Pastikan install: npm install clsx

export default function Input({
	label,
	showLabel = false,
	text = '',
	id,
	type = 'text',
	iconLeft,
	iconRight,
	transparent = false,
	className = '',
}) {
	return (
		<div className={clsx({ relative: !showLabel })}>
			{showLabel && (
				<label
					htmlFor={id}
					className={clsx(
						'block text-body-small-base font-medium',
						transparent ? 'text-neutral-white' : 'text-neutral-darkgray'
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
					type={type}
					id={id}
					placeholder={text}
					className={clsx(
						'w-full rounded-md border-2 py-2.5 pe-10 shadow-xs sm:text-body-small-base transition-colors focus:border-primary focus:ring-0 focus:outline-0',
						{
							'pl-10': iconLeft,
							'bg-transparent border-neutral-white text-neutral-white placeholder:text-neutral-white':
								transparent,
							'bg-neutral-white border-neutral-darkgray text-neutral-darkgray placeholder:text-neutral-darkgray':
								!transparent,
						},
						className
					)}
				/>

				{iconRight && (
					<span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center">
						{iconRight}
					</span>
				)}
			</div>
		</div>
	)
}

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
