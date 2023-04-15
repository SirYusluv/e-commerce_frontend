import { useState } from "react";
import styles from "./pagination.module.scss";

interface IProp {
  startNumFrom: number;
  toShowCount: number;
  activeIndex: number;
  onPagiClick: (pagi: number) => void;
}

export default function Pagination({
  startNumFrom,
  toShowCount,
  activeIndex,
  onPagiClick,
}: IProp) {
  return (
    <div className={styles.pagi}>
      {...new Array(toShowCount).fill(".").map((_, i) => (
        <div
          onClick={() => {
            onPagiClick(i); // 0 is 1st item, 1 - 2nd ...
          }}
          key={i}
          className={`${styles["pagi__item"]} ${
            activeIndex === i ? styles["pagi__item--active"] : ""
          } link`}
        >
          <p>{startNumFrom + i}</p>
        </div>
      ))}
    </div>
  );
}
