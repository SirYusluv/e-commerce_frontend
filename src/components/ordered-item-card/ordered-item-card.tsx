import { API_URL } from "@/util/data";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./ordered-item-card.module.scss";

export interface IOrderedItemCardProp {
  _id: string;
  image: string;
  itemName: string;
  date: string;
  price: number;
  status: string;
}

export default function OrderedItemCard({
  _id,
  itemName,
  price,
  date,
  status,
}: IOrderedItemCardProp) {
  const router = useRouter();

  return (
    <div className={styles["cart-item"]}>
      {/* <div className={styles["cart-item__image--ctn"]}>
        <Image
          className={styles["cart-item__image"]}
          alt="item"
          src={`${API_URL}/${image}`}
          fill
        />
      </div> */}

      <div
        className={styles["cart-item__detail"]}
        onClick={() => router.push(`/receipt/${_id}`)}
      >
        <div className={styles["cart-item__detail--1"]}>
          <p className={styles["cart-item__title"]}>{itemName}</p>
          <p className={styles["cart-item__price"]}>&#x20A6;{price}</p>
        </div>

        <div className={styles["cart-item__detail--2"]}>
          <p className={styles["cart-item__title"]}>{date}</p>
          <p className={styles["cart-item__price"]}>{status}</p>
        </div>
      </div>
    </div>
  );
}
