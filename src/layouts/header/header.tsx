import Nav from "../nav/nav";
import styles from "./header.module.scss";
import Hero from "./hero/hero";

export default function Header() {
  return (
    <header className={styles.header}>
      <Nav />
      <Hero />
    </header>
  );
}
