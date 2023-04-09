import Image, { StaticImageData } from "next/image";
import filledStar from "@/assets/filled-star.svg";
import unFilledStar from "@/assets/unfilled-star.svg";
import variables from "@/styles/variables.module.scss";
import styles from "./item.module.scss";

export interface IItem {
  id: string;
  name: string;
  price: number;
  remainingCount: number;
  reviewCount: number;
  stars: number;
  // images: string // TODO: when images is from db
  image: StaticImageData;
}

interface IItemExtended extends IItem {
  whiteBg?: boolean;
}

export default function Item({
  name,
  price,
  remainingCount,
  reviewCount,
  stars,
  image,
  whiteBg,
}: IItemExtended) {
  return (
    <div className={`link ${styles.item}`}>
      <div
        className={`${styles["item__image--bg"]} ${
          whiteBg && styles["item__image--bg-white"]
        }`}
      >
        <div className={styles["item__image--ctn"]}>
          <Image
            className={styles["item__image"]}
            alt={name}
            src={image}
            fill
          />
        </div>
      </div>

      <div className={styles["item__info"]}>
        <h3 className={styles["item__heading"]}>{name}</h3>
        <p className={styles["item__price"]}>
          &#x20A6;{price} ({remainingCount} left)
        </p>
        <div className={styles["item__ratings"]}>
          <div>
            {...new Array(5).fill(".").map((_, i) => (
              <Image
                alt="rating"
                src={i <= stars - 1 ? filledStar : unFilledStar}
                className={styles["item__star"]}
                width="20"
                sizes={`(max-width: ${variables.widthMobile}) 15px,
                20px`}
              />
            ))}
          </div>
          <p className={styles["item__review"]}>({reviewCount} reviews)</p>
        </div>
      </div>
    </div>
  );
}