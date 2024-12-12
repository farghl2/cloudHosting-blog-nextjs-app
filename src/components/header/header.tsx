import Link from "next/link"

import styles from './header.module.css'
import Navbar from "./navbar"

const Header = () => {
  return (
   <header className={styles.header}>
    <Navbar />
    <div className={styles.right}>
    <Link href={'/login'} className={styles.btn}>Login</Link>
    <Link href={'/register'} className={styles.btn}>Register</Link>

    </div>
   </header>
  )
}

export default Header