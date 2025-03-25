import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression2'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		compression(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
			manifest: {
				name: 'CeritaKita',
				short_name: 'CeritaKita',
				description: 'Platform berbagi pengalaman melalui cerita.',
				theme_color: '#f2f2f2',
				background_color: '#f2f2f2',
				display: 'standalone',
				icons: [
					{
						src: '/icons/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/icons/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/api\.ceritakita\.com\/.*/, // API utama
						handler: 'NetworkFirst',
						options: {
							cacheName: 'api-cache',
							expiration: {
								maxEntries: 50, // Maksimal 50 request yang disimpan
								maxAgeSeconds: 60 * 60 * 24, // Cache berlaku 1 hari
							},
							networkTimeoutSeconds: 5, // Jika jaringan lambat, ambil dari cache
						},
					},
					{
						urlPattern: /^https:\/\/imagekit\.io\/.*/, // Gambar dari ImageKit
						handler: 'CacheFirst',
						options: {
							cacheName: 'image-cache',
							expiration: {
								maxEntries: 100, // Maksimal 100 gambar yang disimpan
								maxAgeSeconds: 60 * 60 * 24 * 7, // Cache gambar berlaku 1 minggu
							},
						},
					},
				],
			},
		}),
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './jest.config.js',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
})
