import { HelmetProvider } from 'react-helmet-async'
import { IKContext } from 'imagekitio-react';
import AppRoutes from './routes/AppRoutes'

function App() {
	const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY
	const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URLENDPOINT

	return (
		<HelmetProvider>
			<IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} clientHints={true}>
				<AppRoutes />
			</IKContext>
		</HelmetProvider>
	)
}

export default App
