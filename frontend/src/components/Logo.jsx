// import logo image
import logoBlack from '../assets/Logo CeritaKita - Black.png'
import logoWhite from '../assets/Logo CeritaKita - White.png'

const Logo = ({ dark }) => {
	return (
		<div className="flex">
			<img
				src={dark ? logoBlack : logoWhite}
				alt="Logo CeritaKita"
				title="logo CeritaKita"
				loading="lazy"
				className="w-8"
			/>
			<p className="text-heading text-neutral-white font-semibold">CeritaKita</p>
		</div>
	)
}

export default Logo
