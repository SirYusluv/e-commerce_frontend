import IconAndText from "@/components/icon-and-text/icon-and-text";
import { useState } from "react";
import { ICategory } from "../category-sec";
import styles from "./categories.module.scss";

interface IProp {
  categories: ICategory[];
  onCategoryClick: (category: string) => void;
}

export default function Categories({ categories, onCategoryClick }: IProp) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

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
              setActiveCategoryIndex(i);
              category && onCategoryClick(category);
            }}
          />
        ))}
      </div>
    </div>
  );
}
