import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@/components/Button'
import { BrowserRouter } from 'react-router'
import clsx from 'clsx'

describe('Button Component', () => {
	test('render button dengan teks', () => {
		render(<Button text="Klik Saya" />)
		expect(
			screen.getByRole('button', { name: /klik saya/i })
		).toBeInTheDocument()
	})

	test('panggil OnClick saat tombol diklik', () => {
		const handleClick = vi.fn() // Mock function
		render(<Button text="Klik Saya" onClick={handleClick} />)
		fireEvent.click(screen.getByRole('button'))
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	test('merender sebagai <a> saat prop `to` disediakan', () => {
		render(
			<BrowserRouter>
				<Button text="Pergi ke Halaman" to="/halaman" />
			</BrowserRouter>
		)
		const link = screen.getByRole('button', { name: /pergi ke halaman/i })
		expect(link).toHaveAttribute('href', '/halaman')
	})

	test('memastikan style yang benar berdasarkan prop `style`', () => {
		render(<Button text="Styled Button" style="primary" />)
		const button = screen.getByRole('button') || screen.getByRole('link')
		expect(button).toHaveClass(clsx('bg-clr-primary text-clr-text-dark'))
	})

	test('merender ikon kiri dan kanan', () => {
		render(
			<Button
				text="Dengan Icon"
				iconLeft={<span data-testid="icon-left">⬅️</span>}
				iconRight={<span data-testid="icon-right">➡️</span>}
			/>
		)
		expect(screen.getByTestId('icon-left')).toBeInTheDocument()
		expect(screen.getByTestId('icon-right')).toBeInTheDocument()
	})

	test('memiliki default type "button"', () => {
		render(<Button text="Klik Saya" />)
		const button = screen.getByRole('button', { name: /klik saya/i })
		expect(button).toHaveAttribute('type', 'button')
	})

	test('dinonaktifkan saat prop `disabled` disediakan', () => {
		render(<Button text="Klik Saya" disabled />)
		const button = screen.getByRole('button', { name: /klik saya/i })
		expect(button).toBeDisabled()
	})

	test('tidak menavigasi saat dinonaktifkan (jika `to` diatur)', () => {
		render(
			<BrowserRouter>
				<Button text="Pergi ke Halaman" to="/halaman" disabled />
			</BrowserRouter>
		)
		const link = screen.getByRole('button', { name: /pergi ke halaman/i })
		expect(link).toHaveAttribute('aria-disabled', 'true')
	})

	test('menerapkan className tambahan', () => {
		render(<Button text="Styled Button" className="custom-class" />)
		const button = screen.getByRole('button')
		expect(button).toHaveClass('custom-class')
	})

	test('tidak membuat elemen duplikat', () => {
		render(<Button text="Test Button" />)
		const buttons = screen.getAllByRole('button')
		expect(buttons.length).toBe(1)
	})
})
