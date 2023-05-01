import Item, { IItem } from "@/components/item/item";
import { useRouter } from "next/router";
import styles from "./items.module.scss";

interface IProps {
  items: IItem[];
  itemsIsLoading: boolean;
}

export default function Items({ items, itemsIsLoading }: IProps) {
  const router = useRouter();

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
            onItemClick={() => {
              router.push(`/item/${id}`);
            }}
            key={id}
          />
        )
      )}
    </div>
  );
}
