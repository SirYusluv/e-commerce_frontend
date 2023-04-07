import SecLayScaffold from "../sec-lay-scaffold/sec-lay-scaffold";
import Button from "@/components/button/button";
import styles from "./section-items.module.scss";
import { useState } from "react";

const categories = ["Clothing", "Men", "Women", "Grocery", "Lifestyle"];

export default function SectionItems() {
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
              buttonClickHandler={() => setActiveBtnIndex(i)}
              buttonType={activeBtnIndex === i ? "main" : "outlined"}
            />
          ))}
        </div>

        <div></div>
      </div>
    </SecLayScaffold>
  );
}
