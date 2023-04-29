import Categories from "./categories/categories";
import Items from "./items/items";
import supermarket from "@/assets/category-icons/supermarket.png";
import men from "@/assets/category-icons/men.png";
import women from "@/assets/category-icons/women.png";
import sport from "@/assets/category-icons/sport.png";
import computing from "@/assets/category-icons/computing.png";
import health from "@/assets/category-icons/health.png";
import gaming from "@/assets/category-icons/gaming.png";
import babyproduct from "@/assets/category-icons/babyproduct.png";
import phone from "@/assets/category-icons/phone.png";
import clothe from "@/assets/category-icons/supermarket.png";
import casualSweater from "@/assets/items images/casual sweater.png";
import { StaticImageData } from "next/image";
import { useState } from "react";
import { IItem } from "@/components/item/item";
import styles from "./category-sec.module.scss";

export interface ICategory {
  icon: StaticImageData;
  text: string;
}

const categories: ICategory[] = [
  {
    icon: supermarket,
    text: "Supermarket",
  },
  {
    icon: men,
    text: "Men",
  },
  {
    icon: women,
    text: "Women",
  },
  {
    icon: sport,
    text: "Sport",
  },
  {
    icon: computing,
    text: "Computing",
  },
  {
    icon: health,
    text: "Health",
  },
  {
    icon: gaming,
    text: "Gaming",
  },
  {
    icon: babyproduct,
    text: "Baby Products",
  },
  {
    icon: phone,
    text: "Phones",
  },
  {
    icon: clothe,
    text: "Clothing",
  },
];

const itemsList: IItem[] = [
  {
    id: "0",
    name: "Casual sweater",
    image: casualSweater,
    price: 773,
    remainingCount: 3,
    stars: 3,
    reviewCount: 3,
  },
  {
    id: "1",
    name: "Casual sweater",
    image: casualSweater,
    price: 773,
    remainingCount: 3,
    stars: 3,
    reviewCount: 3,
  },
];

export default function CategorySec() {
  const [items, setItems] = useState<IItem[]>(itemsList);
  const [itemsIsLoading, setItemsIsLoading] = useState<boolean>(false);

  function categoryClickHandler(_: string) {
    setItemsIsLoading(true);
    setTimeout(() => {
      setItemsIsLoading(false);
      setItems((prevItems) => [...prevItems]);
    }, 1000);
  }

  return (
    <section className={styles["category-sec"]}>
      <Categories
        categories={categories}
        onCategoryClick={categoryClickHandler}
      />
      <Items items={items} itemsIsLoading={itemsIsLoading} />
    </section>
  );
}
