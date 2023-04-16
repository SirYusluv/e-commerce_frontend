import Item, { IItem } from "../item/item";
import styles from "./item-and-title-pack.module.scss";

interface IProp {
  items: IItem[];
  title: string;
}

export default function ItemAndTitlePack({ items, title }: IProp) {
  return (
    <section className={styles.pack}>
      <div className={styles["pack__bg"]}></div>

      <h3 className={styles["pack__title"]}>{title}</h3>

      <div className={styles["pack__items"]}>
        {items.map(
          (
            {
              id,
              name: name,
              image,
              price,
              remainingCount,
              reviewCount,
              stars,
            },
            i
          ) => (
            <Item
              id={id}
              name={name}
              image={image}
              price={price}
              remainingCount={remainingCount}
              reviewCount={reviewCount}
              stars={stars}
              key={i}
            />
          )
        )}
      </div>
    </section>
  );
}
