import PropTypes from "prop-types"
import clsx from "clsx"
import React from "react"

const Input = React.forwardRef(function Input(
	{
		label,
		showLabel = false,
		text = "",
		id,
		type = "text",
		iconLeft,
		iconRight,
		transparent = false,
		className = "",
		error,
		...props
	},
	ref
) {
	return (
		<div className="flex flex-col gap-1">
			{/* Label (visible or screen-reader only) */}
			<label
				htmlFor={id}
				className={clsx(
					showLabel
						? "block text-body-small-base font-medium"
						: "sr-only", // tetap ada untuk screen reader
					transparent ? "text-clr-text-dark" : "text-clr-text-light"
				)}
			>
				{label}
			</label>

			<div className="relative">
				{/* Icon Left */}
				{iconLeft && (
					<span className="absolute inset-y-0 start-0 grid w-10 place-content-center cursor-text">
						{iconLeft}
					</span>
				)}

				{/* Input */}
				<input
					ref={ref}
					type={type}
					id={id}
					placeholder={text}
					aria-invalid={!!error}
					aria-describedby={error ? `${id}-error` : undefined}
					className={clsx(
						"w-full rounded-md border-2 py-2.5 pe-10 shadow-xs sm:text-body-small-base transition-colors focus:border-clr-primary focus:ring-0 focus:outline-0",
						{
							"pl-10": iconLeft,
							"bg-transparent border-clr-container-light text-clr-text-dark placeholder:text-clr-text-dark":
								transparent,
							"bg-neutral-white border-clr-container-dark text-clr-text-light placeholder:text-clr-text-light":
								!transparent,
							"border-red-500 focus:border-red-500": error,
						},
						className
					)}
					{...props}
				/>

				{/* Icon Right */}
				{iconRight && (
					<span className="absolute inset-y-0 end-0 grid w-10 place-content-center cursor-text">
						{iconRight}
					</span>
				)}
			</div>

			{/* Error message */}
			{error && (
				<p
					id={`${id}-error`}
					className="text-sm text-red-500 mt-1"
					role="alert"
				>
					{error}
				</p>
			)}
		</div>
	)
})

Input.propTypes = {
	label: PropTypes.string.isRequired,
	showLabel: PropTypes.bool,
	text: PropTypes.string,
	id: PropTypes.string.isRequired,
	type: PropTypes.oneOf([
		"text",
		"email",
		"password",
		"number",
		"search",
		"url",
	]),
	iconLeft: PropTypes.node,
	iconRight: PropTypes.node,
	transparent: PropTypes.bool,
	className: PropTypes.string,
	error: PropTypes.string, // optional error message
}

export default Input
