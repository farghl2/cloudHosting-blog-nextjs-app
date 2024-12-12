"use client";

import Link from "next/link"
import styles from './header.module.css'
import { GrTechnology } from "react-icons/gr";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={styles.navbar}>
        <div>
            <Link href={'/'} className={styles.logo}>CLOUD 
            
            <GrTechnology />
            HOSTING
            </Link>
            <div className={styles.menu}>
              {
              toggle? (<IoMdClose onClick={()=>setToggle((prv)=>!prv)}/> )
              
              :
              (<AiOutlineMenu 
              onClick={()=>setToggle((prv)=>!prv)}
              />)
            }
            </div>
        </div>
        <div className={styles.navLinksWrapper}
        style={{
          clipPath: toggle&& 'polygon(0 0, 100% 0, 100% 100%, 0 100%);' ||''
        }}
        >
        <ul className={styles.navLinks}>
            <Link href={'/'}
            className={styles.navLink}
            >Home</Link>
            <Link href={'/articles'} className={styles.navLink}>Articles</Link>
            <Link href={'/about'} className={styles.navLink}>About</Link>
            <Link href={'/admin'} className={styles.navLink}>Admin</Link>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar