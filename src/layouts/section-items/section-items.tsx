import SecLayScaffold from "../sec-lay-scaffold/sec-lay-scaffold";
import Button from "@/components/button/button";
import styles from "./section-items.module.scss";
import { useState } from "react";
import Item, { IItem } from "@/components/item/item";

interface IProps {
  categories: [string, string, string, string, string];
  items: IItem[];
  loadItems: (category: string) => void;
  dataIsLoading: boolean;
}

export default function SectionItems({
  categories,
  items,
  loadItems,
  dataIsLoading,
}: IProps) {
  const [activeBtnIndex, setActiveBtnIndex] = useState<number>(0);

  return (
    <SecLayScaffold
      extraClasses={styles["sec-items"]}
      sectionTitleMain="Some Bright Cool"
      sectionTitle="Items for you!"
      sectionSub="Find your next favorite thing"
    >
      <div className={styles["sec-items__contents"]}>
        <div className={styles["sec-items__btns"]}>
          {categories.map((category, i) => (
            <Button
              extraClasses={styles["sec-items__btn"]}
              text={category}
              buttonClickHandler={() => {
                setActiveBtnIndex(i);
                loadItems(category);
              }}
              buttonType={activeBtnIndex === i ? "main" : "outlined"}
            />
          ))}
        </div>

        <div
          className={`${styles["sec-items__items"]} ${
            dataIsLoading ? "low-opacity" : ""
          }`}
        >
          {items.map(
            (
              { id, name, image, price, remainingCount, reviewCount, stars },
              i
            ) => (
              <Item
                key={id}
                id={id}
                name={name}
                image={image}
                price={price}
                remainingCount={remainingCount}
                reviewCount={reviewCount}
                stars={stars}
                whiteBg={i % 2 === 0 ? false : true}
              />
            )
          )}
        </div>
      </div>
    </SecLayScaffold>
  );
}
