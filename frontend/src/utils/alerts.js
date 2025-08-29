// src/utils/toast.js
import Swal from 'sweetalert2'

const BaseToast = Swal.mixin({
	toast: true,
	position: 'top-end',
	timer: 5000,
	showConfirmButton: false,
	timerProgressBar: true,
})

export const successToast = (message) => {
	BaseToast.fire({
		icon: 'success',
		title: message,
		background: '#f2f2f2',
		color: '#212529',
		iconColor: '#007bff',
	})
}

export const errorToast = (message) => {
	BaseToast.fire({
		icon: 'error',
		title: message,
		background: '#f2f2f2',
		color: '#e7000b',
		iconColor: '#e7000b',
	})
}
