import Link from "next/link"

import styles from './header.module.css'
import Navbar from "./navbar"
import { cookies } from "next/headers"
import { verifyTokenForPages } from "@/utils/verifyToken"
import LogoutBtn from "./LogoutBtn"

const Header = () => {
  const token = cookies().get('jwtToken')?.value || '';
  const user = verifyTokenForPages(token);
  return (
   <header className={styles.header}>
    <Navbar />
    <div className={styles.right}>
      {user !==null?(
        <>
          <strong className="text-blue-800 md:text-xl capitalize ">{user.username}</strong>
          <LogoutBtn />
        </>
      ):(
        <>
<Link href={'/login'} className={styles.btn}>Login</Link>
<Link href={'/register'} className={styles.btn}>Register</Link>

        </>
      )

      }

    </div>
   </header>
  )
}

export default Header