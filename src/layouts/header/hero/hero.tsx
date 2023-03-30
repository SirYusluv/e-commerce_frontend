import HeroLeft from "../hero-left/hero-left";
import HeroRight from "../hero-right/hero-right";
import variables from "@/styles/variables.module.scss";
import styles from "./hero.module.scss";
import useResponsive from "@/hooks/use-responsive";

export default function Hero() {
  const isTablet = useResponsive(`(max-width: ${variables.widthTablet})`);
  return (
    <section className={styles.hero}>
      <HeroLeft />
      {!isTablet && <HeroRight />}
    </section>
  );
}
