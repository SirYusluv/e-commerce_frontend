import filledStar from "@/assets/filled-star.svg";
import unFilledStar from "@/assets/unfilled-star.svg";
import Image from "next/image";
import variables from "@/styles/variables.module.scss";
import styles from "./info.module.scss";

interface IProp {
  itemName: string;
  stars: number;
  reviewCount: number;
  price: number;
  remainingCount: number;
}

// TODO: put sava functionality
export default function Info({
  itemName,
  stars,
  price,
  remainingCount,
  reviewCount,
}: IProp) {
  return (
    <div className={styles.info}>
      <p className={styles["info__name"]}>{itemName}</p>
      <div className={styles["info__ratings"]}>
        <div>
          {...new Array(5).fill(".").map((_, i) => (
            <Image
              alt="rating"
              src={i <= stars - 1 ? filledStar : unFilledStar}
              className={styles["info__star"]}
              width="20"
              sizes={`(max-width: ${variables.widthMobile}) 15px,
                  20px`}
              key={i}
            />
          ))}
        </div>

        <p className={styles["info__review"]}>({reviewCount} reviews)</p>
      </div>

      <p className={styles["info__price"]}>
        &#x20A6;{price} ({remainingCount} left)
      </p>
    </div>
  );
}
