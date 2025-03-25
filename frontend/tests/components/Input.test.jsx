import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '@/components/Input'

describe('Input Component', () => {
	test('menampilkan input dengan placeholder yang sesuai', () => {
		render(<Input id="test-input" text="Masukkan teks di sini" />)
		expect(
			screen.getByPlaceholderText('Masukkan teks di sini')
		).toBeInTheDocument()
	})

	test('menampilkan label jika properti `showLabel` bernilai true', () => {
		render(<Input id="test-input" label="Nama" showLabel={true} />)
		expect(screen.getByLabelText('Nama')).toBeInTheDocument()
	})

	test('tidak menampilkan label jika properti `showLabel` bernilai false', () => {
		render(<Input id="test-input" label="Nama" showLabel={false} />)
		expect(screen.queryByLabelText('Nama')).not.toBeInTheDocument()
	})

	test('dapat menerima input dari pengguna', async () => {
		render(<Input id="test-input" />)
		const inputElement = screen.getByRole('textbox')
		await userEvent.type(inputElement, 'Halo')
		expect(inputElement).toHaveValue('Halo')
	})

	test('menampilkan ikon di sebelah kiri jika properti `iconLeft` diberikan', () => {
		render(
			<Input
				id="test-input"
				iconLeft={<span data-testid="icon-left">🔍</span>}
			/>
		)
		expect(screen.getByTestId('icon-left')).toBeInTheDocument()
	})

	test('menampilkan ikon di sebelah kanan jika properti `iconRight` diberikan', () => {
		render(
			<Input
				id="test-input"
				iconRight={<span data-testid="icon-right">✔</span>}
			/>
		)
		expect(screen.getByTestId('icon-right')).toBeInTheDocument()
	})

	test('menggunakan tema transparan jika properti `transparent` bernilai true', () => {
		render(<Input id="test-input" transparent={true} />)
		const inputElement = screen.getByRole('textbox')
		expect(inputElement).toHaveClass(
			'bg-transparent border-neutral-white text-neutral-white placeholder:text-neutral-white'
		)
	})

	test('menggunakan tema standar jika properti `transparent` bernilai false', () => {
		render(<Input id="test-input" transparent={false} />)
		const inputElement = screen.getByRole('textbox')
		expect(inputElement).toHaveClass(
			'bg-neutral-white border-neutral-darkgray text-neutral-darkgray placeholder:text-neutral-darkgray'
		)
	})
})
