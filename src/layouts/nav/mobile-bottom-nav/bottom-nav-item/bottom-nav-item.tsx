import { StaticImageData } from "next/image";
import Image from "next/image";
import styles from "./bottom-nav-item.module.scss";

export type ButtomNavItemText = "Home" | "Saved" | "Orders" | "Account";

export interface IBottomNavItem {
  text: ButtomNavItemText;
  icon: StaticImageData;
}

interface IProp extends IBottomNavItem {
  isActive: boolean;
  clickHandler?: () => void;
}

export default function BottomNavItem({
  icon,
  text,
  isActive,
  clickHandler,
}: IProp) {
  return (
    <div
      onClick={() => clickHandler && clickHandler()}
      className={`${styles["bottom-item"]} ${
        isActive ? styles["bottom-item--active"] : ""
      }`}
    >
      <Image alt={text} src={icon} width="23.35" sizes="23.35px" />
      <p>{text}</p>
    </div>
  );
}
