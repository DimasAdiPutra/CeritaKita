import { Helmet } from 'react-helmet-async'
import Button from '../components/Button'

const HomePage = () => {
	return (
		<>
			<Helmet>
				<title>CeritaKita - Berbagi Cerita & Pengalaman</title>
			</Helmet>

			<header className="hero relative h-[calc(100vh-16px)] rounded overflow-hidden">
				<video
					autoPlay
					muted
					loop
					className="absolute top-0 left-0 w-full h-full object-cover overflow-hidden">
					<source src="/videos/hero.mp4" type="video/mp4" />
					<source src="/videos/hero.webm" type="video/webm" />
					<p>Browser Anda tidak mendukung tag video.</p>
				</video>
				<div className="container h-full">
					<div className="relative z-20 h-full max-w-xl lg:max-w-7xl sm:px-6 lg:h-screen">
						<div className="flex flex-col justify-center h-full max-w-xl lg:max-w-7xl">
							<h1 className="text-titlepage font-extrabold w-full max-w-48 md:max-w-lg lg:text-9xl lg:max-w-xl xl:text-titlehero xl:max-w-xl text-neutral-white">
								Setiap Cerita Adalah Inspirasi
							</h1>

							<p className="mt-4 text-body-base max-w-lg text-neutral-white">
								Bagikan pengalamanmu, temukan inspirasi dari orang lain, dan
								jadilah bagian dari <strong>CeritaKita</strong> yang saling
								mendukung.
							</p>

							<div className="mt-8 w-max flex text-center gap-2">
								<Button to="/post" text="Bagikan Cerita" style="primary" />
								<Button
									to="/search"
									text="Mulai Menjelajah"
									style="secondary"
								/>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}

export default HomePage
