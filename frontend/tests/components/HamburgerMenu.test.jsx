import { render, screen, fireEvent } from '@testing-library/react'
import HamburgerMenu from '@/components/HamburgerMenu'

describe('HamburgerMenu Component', () => {
	test('menampilkan tombol dengan label aria yang benar saat menu tertutup', () => {
		render(<HamburgerMenu isOpen={false} onClick={() => { }} />)
		expect(
			screen.getByRole('button', { name: /open menu/i })
		).toBeInTheDocument()
	})

	test('menampilkan tombol dengan label aria yang benar saat menu terbuka', () => {
		render(<HamburgerMenu isOpen={true} onClick={() => { }} />)
		expect(
			screen.getByRole('button', { name: /close menu/i })
		).toBeInTheDocument()
	})

	test('memanggil fungsi onClick ketika tombol ditekan', () => {
		const handleClick = vi.fn()
		render(<HamburgerMenu isOpen={false} onClick={handleClick} />)
		fireEvent.click(screen.getByRole('button'))
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	test('menggunakan warna terang (dark mode) jika properti dark bernilai true', () => {
		render(<HamburgerMenu isOpen={false} dark={true} onClick={() => { }} />)
		const bars = screen.getAllByRole('presentation')
		bars.forEach((bar) => {
			expect(bar).toHaveClass('bg-clr-text-light')
		})
	})

	test('menggunakan warna gelap (light mode) jika properti dark bernilai false', () => {
		render(<HamburgerMenu isOpen={false} dark={false} onClick={() => { }} />)
		const bars = screen.getAllByRole('presentation')
		bars.forEach((bar) => {
			expect(bar).toHaveClass('bg-clr-text-dark')
		})
	})
})
