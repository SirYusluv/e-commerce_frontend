import { ReactNode } from "react";
import styles from "./sec-lay-scaffold.module.scss";

interface IProps {
  children?: ReactNode;
  sectionTitle: string;
  sectionSub: string;
  extraClasses?: string;
}

export default function SecLayScaffold({
  children,
  sectionSub,
  sectionTitle,
  extraClasses,
}: IProps) {
  return (
    <section className={`${styles["scaffold"]} ${extraClasses}`}>
      <div className={styles["scaffold__heading"]}>
        <h2 className={styles["scaffold__title"]}>{sectionTitle}</h2>
        <h2 className={styles["scaffold__sub"]}>{sectionSub}</h2>
      </div>
      {children}
    </section>
  );
}
