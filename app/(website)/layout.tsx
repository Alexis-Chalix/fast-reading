import '../globals.css'
import { Inter } from 'next/font/google'
import NavBar from "@/app/(website)/components/navbar/NavBar";
import Footer from "@/app/(website)/components/footer/Footer";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Fast Reading',
	description: 'Fast Reading',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="fr">
			<body className={inter.className}>
				<NavBar />
				{children}
				<Footer />
			</body>
		</html>
	)
}
