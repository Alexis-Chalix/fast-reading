import Link from "next/link";
import styles from './styles.module.css';

export default function NavBar() {
	return(
		<header className={styles.navbar}>
			<h1>Logo</h1>

			<nav className={styles.linksContainer}>
				<Link href="/player" className={styles.link}>Player</Link>
			</nav>
		</header>
	)
}