import { ReactNode } from "react";
import styles from "./item-curved-ctn.module.scss";

interface IProps {
  children: ReactNode;
  extraClasses?: string;
}

export default function ItemCurvedCtn({ children, extraClasses }: IProps) {
  return (
    <div className={`${styles["curved-ctn"]} ${extraClasses}`}>{children}</div>
  );
}
