import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>✨ My fabulous repositories 🦄</h1>
      <nav>
        <ul className={styles.list}>
          <li>
            <Link href="/">
              <a>Server-side rendering (SSR)</a>
            </Link>
          </li>
          <li>
            <Link href="/ssg">
              <a>Static-site generation (SSG)</a>
            </Link>
          </li>
          <li>
            <Link href="/csr">
              <a>Client-side rendering (CSR)</a>
            </Link>
          </li>
          <li>
            <Link href="/isr">
              <a>Incremental static regeneration (ISR)</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
