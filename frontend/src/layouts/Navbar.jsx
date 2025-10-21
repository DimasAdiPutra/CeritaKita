import { Link, NavLink, useLocation } from "react-router"
import { useState, useEffect } from "react"
import { motion } from "motion/react"
import clsx from "clsx"
import { FiSearch, FiLogOut } from "react-icons/fi"

// Components
import Logo from "../components/ui/Logo"
import Input from "../components/ui/Input"
import HamburgerMenu from "../components/ui/HamburgerMenu"
import Button from "../components/ui/Button"

// Hooks
import { useAuth } from "@/context/auth/useAuth"
import { logoutUser } from "@/services/auth.api"
import { FaRegCircleUser } from "react-icons/fa6"

// Data: daftar link navbar
const NAV_ITEMS = [
	{ to: "/", label: "Beranda" },
	{ to: "/blog", label: "Blog" },
	{ to: "/about", label: "Tentang Kami" },
]

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false)
	const [isTransparent, setIsTransparent] = useState(true)
	const location = useLocation()
	const { user, isAuthenticated, setUser } = useAuth()

	// Ubah transparansi navbar saat scroll
	useEffect(() => {
		const handleScroll = () => {
			setIsTransparent(window.scrollY <= 10)
		}

		if (location.pathname === "/") {
			window.addEventListener("scroll", handleScroll)
			handleScroll()
		} else {
			setIsTransparent(false)
		}

		return () => window.removeEventListener("scroll", handleScroll)
	}, [location])

	// Handle logout
	const handleLogout = async () => {
		try {
			await logoutUser()
			setUser(null)
			setIsOpen(false)
		} catch (err) {
			console.error("[Logout Error]:", err)
		}
	}

	// Komponen kecil untuk Search Input
	const SearchInput = ({ id, transparent, mobile }) => (
		<Input
			id={id}
			label="Search"
			type="text"
			text="Search"
			iconRight={
				<FiSearch
					strokeWidth={1.5}
					size={16}
					className={clsx(
						mobile
							? "text-clr-text-light"
							: isTransparent
								? "text-clr-text-dark"
								: "text-clr-text-light"
					)}
				/>
			}
			transparent={transparent}
		/>
	)

	return (
		<nav
			className={clsx(
				"fixed top-0 z-30 w-full h-20 flex items-center transition-all duration-300",
				isTransparent ? "bg-transparent" : "bg-clr-container-light shadow"
			)}
		>
			<div className="container">
				<div className="flex h-16 items-center justify-between w-full relative">
					{/* Logo */}
					<Link to="/">
						<Logo dark={!isTransparent} />
					</Link>

					{/* Search (Desktop) */}
					<div className="hidden lg:block">
						<SearchInput id="search" transparent={isTransparent} />
					</div>

					<div className="flex items-center gap-10">
						{/* Nav links (Desktop) */}
						<nav className="hidden lg:flex" aria-label="Global">
							<ul className="flex items-center gap-6 text-sm">
								{NAV_ITEMS.map(({ to, label }) => (
									<li key={to}>
										<NavLink
											to={to}
											className={({ isActive }) =>
												clsx(
													isTransparent
														? isActive
															? "text-clr-text-dark-hover"
															: "text-clr-text-dark"
														: isActive
															? "text-clr-text-light-hover"
															: "text-clr-text-light",
													"transition hover:opacity-80"
												)
											}
										>
											{label}
										</NavLink>
									</li>
								))}
							</ul>
						</nav>

						{/* Action Buttons (Desktop) */}
						<div className="hidden lg:flex sm:gap-4 items-center">
							{isAuthenticated ? (
								<Link
									to="/profile"
									className={clsx(
										"p-2 rounded-full transition",
										isTransparent
											? "text-clr-text-dark hover:bg-black/5"
											: "text-clr-text-light hover:bg-white/10"
									)}
									title={user?.name || "Profile"}
								>
									<FaRegCircleUser size={20} />
								</Link>
							) : (
								<>
									<Button to="/login" text="Masuk" />
									<Button to="/register" text="Daftar" style="secondary" />
								</>
							)}
						</div>

						{/* Hamburger Menu (Mobile) */}
						<div className="block lg:hidden relative z-50">
							<HamburgerMenu
								onClick={() => setIsOpen((prev) => !prev)}
								isOpen={isOpen}
								dark={isOpen || !isTransparent}
							/>
						</div>
					</div>

					{/* Mobile Menu */}
					<motion.div
						id="mobile-menu"
						aria-hidden={!isOpen}
						aria-label="Navigasi mobile"
						inert={!isOpen ? "" : undefined}
						initial={{ x: "100%" }}
						animate={{ x: isOpen ? "0%" : "100%" }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", stiffness: 200, damping: 30 }}
						className={clsx(
							"fixed top-0 right-0 h-screen min-w-72 w-max z-40 flex flex-col justify-between border-e bg-clr-container-light px-4 pb-10 pt-24",
							isOpen && "shadow-xl"
						)}
					>
						<div className="w-full">
							{/* Mobile Search */}
							<SearchInput id="mobileSearch" mobile />

							{/* Nav Links (Mobile) */}
							<ul className="mt-6 space-y-1">
								{NAV_ITEMS.map(({ to, label }) => (
									<li key={to}>
										<NavLink
											to={to}
											className={({ isActive }) =>
												clsx(isActive ? "navlink-active" : "navlink")
											}
											onClick={() => setIsOpen(false)}
										>
											{label}
										</NavLink>
									</li>
								))}
							</ul>
						</div>

						{/* Action Buttons (Mobile) */}
						<div className="flex flex-col gap-2">
							{isAuthenticated ? (
								<Button
									text="Logout"
									iconLeft={<FiLogOut size={16} />}
									onClick={handleLogout}
									style="primary-outline"
								/>
							) : (
								<>
									<Button to="/login" text="Masuk" style="primary-outline" />
									<Button to="/register" text="Daftar" />
								</>
							)}
						</div>
					</motion.div>
				</div>
			</div>
		</nav>
	)
}
