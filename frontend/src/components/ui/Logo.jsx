import LogoIcon from "../../assets/logo.svg?react"

export default function Logo({ dark = false }) {
	return (
		<div className="flex items-center gap-1">
			<LogoIcon
				className={`h-8 w-auto ${dark ? "stroke-clr-text-light" : "stroke-clr-text-dark"
					}`}
				aria-label="Logo CeritaKita"
			/>
			<p
				className={`text-heading font-semibold ${dark ? "text-clr-text-light" : "text-clr-text-dark"
					}`}
			>
				CeritaKita
			</p>
		</div>
	)
}
