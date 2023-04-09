import Image, { StaticImageData } from "next/image";
import filledStar from "@/assets/filled-star.svg";
import unFilledStar from "@/assets/unfilled-star.svg";
import variables from "@/styles/variables.module.scss";
import styles from "./review-card.module.scss";

export interface IReview {
  stars: number;
  review: string;
  name: string;
  date: string;
  image: StaticImageData;
}

export default function ReviewCard({
  name,
  stars,
  review,
  image,
  date,
}: IReview) {
  return (
    <div className={styles.card}>
      <div className={styles["card__review-star"]}>
        <div className={styles["card__stars"]}>
          {...new Array(5)
            .fill(".")
            .map((_, i) => (
              <Image
                className={styles["card__star"]}
                key={date}
                alt="star"
                src={i + 1 > stars ? unFilledStar : filledStar}
                width="20"
                sizes={`(max-width: ${variables.widthMobile}) 15px, 20px`}
              />
            ))}
        </div>
        <p>{review}</p>
      </div>

      <figure className={styles["card__details"]}>
        <Image
          className={styles["card__image"]}
          alt={name}
          src={image}
          width="70"
          sizes={`(max-width: ${variables.widthMobile}) 40px, 70px`}
        />
        <figcaption className={styles["card__name-date"]}>
          <h4 className={styles["card__name"]}>{name}</h4>
          <p className={styles["card__date"]}>{date}</p>
        </figcaption>
      </figure>
    </div>
  );
}
