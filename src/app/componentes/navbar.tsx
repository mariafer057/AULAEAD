'use client';

import styles from './navbar.module.css';
import Link from 'next/link';
const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <h1>El Mariachi</h1>
      <ul className={styles['nav-links']}>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/menu" className={styles.link}>Cardápio</Link>
        <Link href="/reserva" className={styles.link}>Reservas</Link>
        <Link href="/mesas" className={styles.link}>Contato</Link>
      </ul>

      <button className={styles.button}>
        <Link  href={"/login"}>
                <p>Login</p>
            </Link>
        </button>
    </nav>
  );
};

export default NavBar;
