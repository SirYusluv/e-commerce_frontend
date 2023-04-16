import styles from "./detail.module.scss";

interface IProp {
  desc1: string;
  desc2: string;
}

export default function Detail({ desc1, desc2 }: IProp) {
  return (
    <div className={styles.details}>
      <p className={styles["details__title"]}>Description</p>

      <div className={styles["details__desc"]}>
        <p className={styles["details__desc--1"]}>{desc1}</p>
        <p className={styles["details__desc--2"]}>{desc2}</p>
      </div>
    </div>
  );
}
