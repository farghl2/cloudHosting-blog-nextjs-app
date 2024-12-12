import { TiTick } from "react-icons/ti";
import Image from "next/image";
import styles from "./hero.module.css";
export const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroLeft}>
        <h1 className={styles.title}>Cloud Hosting</h1>
        <p className={styles.desc}>
          The best web hosting solution for your online success.
        </p>
        <div className={styles.services}>
          <div className={styles.serviceItem}>
            <TiTick /> Easy To Use Control Panel
          </div>
          <div className={styles.serviceItem}>
            <TiTick /> Secure Hosting
          </div>
          <div className={styles.serviceItem}>
            <TiTick /> Website Maintenance
          </div>
        </div>
      </div>
      <div>
        <Image
          src={"/cloud-hosting.png"}
          width={500}
          height={500}
          alt="cloud image"
        />
      </div>
    </div>
  );
};
