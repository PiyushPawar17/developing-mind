import { useRef } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	const queryClientRef = useRef<typeof QueryClient.prototype | null>(null);
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient();
	}

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width, shrink-to-fit=no" />

				<title>Developing Mind | A Blog by Piyush</title>
				<meta name="title" content="Developing Mind | A Blog by Piyush" />
				<meta name="description" content="A place where I try to teach what I've learned" />

				<meta property="og:title" content="Developing Mind | A Blog by Piyush" />
				<meta property="og:description" content="A place where I try to teach what I've learned" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://blog.piyushpawar.dev" />
				<meta property="og:image" content="https://blog.piyushpawar.dev/logo512.png" />
				<meta property="og:site_name" content="Developing Mind" />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:site" content="@PiyushPawar_17" />
				<meta property="twitter:creator" content="@PiyushPawar_17" />
				<meta property="twitter:url" content="https://blog.piyushpawar.dev" />
				<meta property="twitter:title" content="Developing Mind | A Blog by Piyush" />
				<meta property="twitter:description" content="A place where I try to teach what I've learned" />
				<meta property="twitter:image" content="https://blog.piyushpawar.dev/logo512.png" />
				<meta property="twitter:image:alt" content="Developing Mind Logo" />

				<link rel="manifest" href="/manifest.json" />
				<link rel="shortcut icon" type="image/x-icon" sizes="64x64 32x32 16x16" href="/favicon.ico" />
				<link rel="apple-touch-icon" type="image/x-icon" sizes="64x64 32x32 16x16" href="/favicon.ico" />
				<link rel="icon" type="image/png" sizes="192x192" href="/logo192.png" />
				<link rel="apple-touch-icon" type="image/png" sizes="192x192" href="/logo192.png" />
				<link rel="icon" type="image/png" sizes="512x512" href="/logo512" />
				<link rel="apple-touch-icon" type="image/png" sizes="512x512" href="/logo512" />

				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
				<link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet" />
			</Head>
			<QueryClientProvider client={queryClientRef.current}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</>
	);
};

export default App;
