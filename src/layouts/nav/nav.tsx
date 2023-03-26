import Image from "next/image";
import logo from "@/assets/logo.svg";
import hamburger from "@/assets/hamburger.png";
import Search from "@/components/search/search";
import styles from "./nav.module.scss";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <div className={styles.navi}>
        <p className="link">Home</p>
        <p className="link">Items</p>
        <p className="link">Contact Us</p>
      </div>

      <div className={styles["mobile-nav"]}>
        <div className={styles["mobile__view"]}></div>
        <Image alt="E-commerce" src={logo} />
        <Image
          className={styles["mobile__view"]}
          alt="hamburger"
          src={hamburger}
        />
      </div>

      <Search
        onSearchClick={() => router.push("/auth/signin")}
        extraClasses={styles.search}
      />
    </nav>
  );
}
