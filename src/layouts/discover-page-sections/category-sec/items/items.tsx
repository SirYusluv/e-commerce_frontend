import Item, { IItem } from "@/components/item/item";
// import variables from "@/styles/variables.module.scss";
import styles from "./items.module.scss";

interface IProps {
  items: IItem[];
  itemsIsLoading: boolean;
}

export default function Items({ items, itemsIsLoading }: IProps) {
  return (
    <div className={`${styles.items} ${itemsIsLoading ? "low-opacity" : ""}`}>
      {items.map(
        ({ id, name, price, remainingCount, reviewCount, image, stars }) => (
          <Item
            id={id}
            name={name}
            price={price}
            remainingCount={remainingCount}
            image={image}
            reviewCount={reviewCount}
            stars={stars}
            key={id}
          />
        )
      )}
    </div>
  );
}
