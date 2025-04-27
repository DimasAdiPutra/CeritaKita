// import logo image
import logoBlack from '../assets/Logo CeritaKita - Black.png'
import logoWhite from '../assets/Logo CeritaKita - White.png'

const Logo = ({ dark }) => {
	return (
		<div className="flex gap-1">
			<img
				src={dark ? logoBlack : logoWhite}
				alt="Logo CeritaKita"
				title="logo CeritaKita"
				loading="lazy"
				className="h-8"
			/>
			<p
				className={`text-heading font-semibold ${
					dark ? 'text-clr-text-light' : 'text-clr-text-dark'
				}`}>
				CeritaKita
			</p>
		</div>
	)
}

export default Logo
