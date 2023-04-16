import Image from "next/image";
import bag from "@/assets/bg-bag.png";
import shoe from "@/assets/bg-nike.png";
import styles from "./hero-right.module.scss";
import ItemCurvedCtn from "@/components/item-curved-ctn/item-curved-ctn";

export default function HeroRight() {
  return (
    <div className={styles.hero}>
      <ItemCurvedCtn extraClasses={styles["hero__bag--ctn"]}>
        <Image
          className={styles["hero__bag"]}
          width="16.8"
          alt="bag"
          src={bag}
        />
      </ItemCurvedCtn>
      <ItemCurvedCtn extraClasses={styles["hero__shoe--ctn"]}>
        <Image
          className={styles["hero__shoe"]}
          width="19.4"
          alt="shoe"
          src={shoe}
        />
      </ItemCurvedCtn>
    </div>
  );
}
