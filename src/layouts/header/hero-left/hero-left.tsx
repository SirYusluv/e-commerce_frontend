import Button from "@/components/button/button";
import filledStar from "@/assets/filled-star.png";
import Image from "next/image";
import variables from "@/styles/variables.module.scss";
import styles from "./hero-left.module.scss";
import { useRouter } from "next/router";

export default function HeroLeft() {
  const router = useRouter();

  return (
    <div className={styles.hero}>
      <div className={styles["hero__hero"]}>
        <h1 className={styles["hero__hero-text"]}>
          A better way
          <br /> to <span>SHOP</span>
        </h1>
        <p className={styles["hero__hero-sub"]}>
          A smarter and more efficient way to shop. Enjoy the convenience of
          comparing and purchasing from the comfort of your home.
        </p>
      </div>

      <Button
        buttonClickHandler={() => router.push("/auth/signin")}
        extraClasses={styles["hero__btn"]}
        text="Explore More"
        buttonType="main"
      />
      <div className={styles["hero__rating"]}>
        <div className={styles["hero__stars-ctn"]}>
          {...Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className={styles["hero__star-ctn"]}>
                <Image
                  fill
                  sizes={`(max-width: ${variables.widthMobile}) 15px,
                (max-width: ${variables.widthTablet}) 20px,
                20px`}
                  alt="star"
                  src={filledStar}
                />
              </div>
            ))}
        </div>
        <p className={styles["hero__rating--text"]}>
          Rated 4.8 on App Store and Play Store
        </p>
      </div>
    </div>
  );
}
