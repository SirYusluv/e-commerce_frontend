import IconAndText from "@/components/icon-and-text/icon-and-text";
import { useState } from "react";
import { ICategory } from "../category-sec";
import styles from "./categories.module.scss";

interface IProp {
  categories: ICategory[];
  activeCategoryIndex: number;
  onCategoryClick: (category: string) => void;
}

export default function Categories({
  categories,
  activeCategoryIndex,
  onCategoryClick,
}: IProp) {
  return (
    <div className={styles.categories}>
      <div className={styles["categories__category--ctn"]}>
        {categories.map(({ icon, text }, i) => (
          <IconAndText
            extraClasses={`${styles["categories__category"]} ${
              i === activeCategoryIndex
                ? styles["categories__category--active"]
                : ""
            }`}
            icon={icon}
            text={text}
            key={i}
            clickHandler={(category) => {
              category && onCategoryClick(category);
            }}
          />
        ))}
      </div>
    </div>
  );
}
