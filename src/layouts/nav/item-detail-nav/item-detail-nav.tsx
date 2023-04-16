import backArrow from "@/assets/back-arrow.png";
import Image from "next/image";
import variables from "@/styles/variables.module.scss";
import styles from "./item-detail-nav.module.scss";
import { useRouter } from "next/router";

interface IProp {
  title: string;
}

export default function ItemDetailNav({ title }: IProp) {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <Image
        onClick={router.back}
        className={`${styles["nav__image"]} link`}
        src={backArrow}
        alt="back"
        width="40"
        sizes={`(max-width: ${variables.widthMobile}) 25px,
    (max-width: ${variables.widthMobile}) 35px,
    40px`}
      />

      <p>{title}</p>
    </nav>
  );
}
