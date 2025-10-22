import { HelmetProvider } from 'react-helmet-async'
import { IKContext } from 'imagekitio-react';
import AuthProvider from '@/context/auth/AuthProvider'
import AppRoutes from './routes/AppRoutes'

function App() {
	const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY
	const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URLENDPOINT

	return (
		<HelmetProvider>
			<AuthProvider>
				<IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} clientHints={true}>
					<AppRoutes />
				</IKContext>
			</AuthProvider>
		</HelmetProvider>
	)
}

export default App
