import { ReactNode } from "react";
import styles from "./sec-lay-scaffold.module.scss";

interface IProps {
  children?: ReactNode;
  sectionTitleMain?: string; // diffrent colour
  sectionTitle: string;
  sectionSub: string;
  extraClasses?: string;
}

export default function SecLayScaffold({
  children,
  sectionSub,
  sectionTitleMain,
  sectionTitle,
  extraClasses,
}: IProps) {
  return (
    <section className={`${styles["scaffold"]} ${extraClasses}`}>
      <div className={styles["scaffold__heading"]}>
        {sectionTitleMain && (
          <h2 className={styles["scaffold__title"]}>
            <span>{sectionTitleMain} </span>
            {sectionTitle}
          </h2>
        )}
        {!sectionTitleMain && (
          <h2 className={styles["scaffold__title"]}>sectionTitle</h2>
        )}
        <h2 className={styles["scaffold__sub"]}>{sectionSub}</h2>
      </div>
      {children}
    </section>
  );
}
