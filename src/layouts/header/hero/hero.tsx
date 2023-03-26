import HeroLeft from "../hero-left/hero-left";
import HeroRight from "../hero-right/hero-right";
import styles from "./hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <HeroLeft />
      <HeroRight />
    </section>
  );
}
