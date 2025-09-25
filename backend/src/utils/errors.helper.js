/**
 * Error Constants dan Dictionary untuk konsistensi
 */

const ERROR_CODES = {
	// Authentication
	UNAUTHORIZED: 'UNAUTHORIZED',
	INVALID_TOKEN: 'INVALID_TOKEN',
	TOKEN_EXPIRED: 'TOKEN_EXPIRED',
	ACCESS_DENIED: 'ACCESS_DENIED',
	USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
	ALREADY_AUTHENTICATED: 'ALREADY_AUTHENTICATED',

	// Validation
	VALIDATION_ERROR: 'VALIDATION_ERROR',
	REQUIRED_FIELD: 'REQUIRED_FIELD',
	INVALID_FORMAT: 'INVALID_FORMAT',

	// Business Logic
	RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
	DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
	INSUFFICIENT_PERMISSION: 'INSUFFICIENT_PERMISSION',
	BUSINESS_RULE_VIOLATION: 'BUSINESS_RULE_VIOLATION',
	RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',

	// Database
	DATABASE_ERROR: 'DATABASE_ERROR',
	CONNECTION_FAILED: 'CONNECTION_FAILED',

	// General
	INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
	BAD_REQUEST: 'BAD_REQUEST',
	NOT_FOUND: 'NOT_FOUND',
}

// Pesan Error (Bahasa Indonesia, smart casual tone)
const ERROR_MESSAGES = {
	[ERROR_CODES.USER_ALREADY_EXISTS]:
		'Email atau username ini sudah digunakan. Silakan pilih yang lain.',
	[ERROR_CODES.ALREADY_AUTHENTICATED]:
		'Sesi Anda sudah aktif. Tidak perlu login ulang.',
	[ERROR_CODES.UNAUTHORIZED]: 'Akses ditolak. Silakan login terlebih dahulu.',
	[ERROR_CODES.INVALID_TOKEN]: 'Token tidak valid. Silakan login ulang.',
	[ERROR_CODES.TOKEN_EXPIRED]:
		'Sesi Anda sudah berakhir. Silakan login kembali.',
	[ERROR_CODES.ACCESS_DENIED]:
		'Anda tidak memiliki izin untuk mengakses fitur ini.',

	[ERROR_CODES.VALIDATION_ERROR]:
		'Beberapa data tidak valid. Mohon periksa kembali.',
	[ERROR_CODES.REQUIRED_FIELD]:
		'Ada data yang wajib diisi. Harap lengkapi terlebih dahulu.',
	[ERROR_CODES.INVALID_FORMAT]: 'Format data tidak sesuai. Silakan perbaiki.',

	[ERROR_CODES.RESOURCE_NOT_FOUND]: 'Data yang Anda cari tidak ditemukan.',
	[ERROR_CODES.DUPLICATE_ENTRY]: 'Data ini sudah ada di sistem.',
	[ERROR_CODES.INSUFFICIENT_PERMISSION]:
		'Izin Anda tidak cukup untuk melakukan aksi ini.',
	[ERROR_CODES.BUSINESS_RULE_VIOLATION]:
		'Tindakan ini tidak sesuai dengan aturan sistem.',
	[ERROR_CODES.RATE_LIMIT_EXCEEDED]:
		'Terlalu banyak permintaan. Silakan coba beberapa saat lagi.',

	[ERROR_CODES.DATABASE_ERROR]:
		'Terjadi masalah pada database. Silakan coba kembali.',
	[ERROR_CODES.CONNECTION_FAILED]:
		'Koneksi ke database gagal. Coba beberapa saat lagi.',

	[ERROR_CODES.INTERNAL_SERVER_ERROR]:
		'Terjadi kesalahan pada server. Silakan coba kembali nanti.',
	[ERROR_CODES.BAD_REQUEST]:
		'Permintaan tidak valid. Periksa kembali data yang dikirim.',
	[ERROR_CODES.NOT_FOUND]: 'Halaman atau resource tidak tersedia.',
}

const ERROR_STATUS_CODES = {
	[ERROR_CODES.UNAUTHORIZED]: 401,
	[ERROR_CODES.INVALID_TOKEN]: 401,
	[ERROR_CODES.TOKEN_EXPIRED]: 401,
	[ERROR_CODES.ACCESS_DENIED]: 403,
	[ERROR_CODES.USER_ALREADY_EXISTS]: 409,
	[ERROR_CODES.ALREADY_AUTHENTICATED]: 400,

	[ERROR_CODES.VALIDATION_ERROR]: 422,
	[ERROR_CODES.REQUIRED_FIELD]: 422,
	[ERROR_CODES.INVALID_FORMAT]: 422,

	[ERROR_CODES.RESOURCE_NOT_FOUND]: 404,
	[ERROR_CODES.DUPLICATE_ENTRY]: 409,
	[ERROR_CODES.INSUFFICIENT_PERMISSION]: 403,
	[ERROR_CODES.BUSINESS_RULE_VIOLATION]: 400,
	[ERROR_CODES.RATE_LIMIT_EXCEEDED]: 429,

	[ERROR_CODES.DATABASE_ERROR]: 500,
	[ERROR_CODES.CONNECTION_FAILED]: 500,

	[ERROR_CODES.INTERNAL_SERVER_ERROR]: 500,
	[ERROR_CODES.BAD_REQUEST]: 400,
	[ERROR_CODES.NOT_FOUND]: 404,
}

const createError = (
	code,
	message = null,
	details = null,
	statusCode = null
) => {
	const error = new Error(
		message || ERROR_MESSAGES[code] || 'Terjadi kesalahan yang tidak diketahui.'
	)
	error.code = code
	error.statusCode = statusCode || ERROR_STATUS_CODES[code] || 500
	error.details = details
	return error
}

export { ERROR_CODES, ERROR_MESSAGES, ERROR_STATUS_CODES, createError }
