import home from "@/assets/home.png";
import saved from "@/assets/saved.png";
import orders from "@/assets/orders.png";
import account from "@/assets/account.png";
import BottomNavItem, {
  IBottomNavItem,
} from "./bottom-nav-item/bottom-nav-item";
import { useState } from "react";
import styles from "./mobile-bottom-nav.module.scss";

const bottomNavItems: IBottomNavItem[] = [
  {
    icon: home,
    text: "Home",
  },
  {
    icon: saved,
    text: "Saved",
  },
  {
    icon: orders,
    text: "Orders",
  },
  {
    icon: account,
    text: "Account",
  },
];

export default function MobileBottomNav() {
  const [bottomNavActiveIndex, setBottomNavActiveIndex] = useState<number>(0);

  function bottomItemClickHandler(i: number) {
    setBottomNavActiveIndex(i);
  }

  return (
    <div className={styles["bottom-nav"]}>
      {bottomNavItems.map(({ icon, text }, i) => (
        <BottomNavItem
          isActive={i === bottomNavActiveIndex ? true : false}
          icon={icon}
          text={text}
          clickHandler={() => setBottomNavActiveIndex(i)}
          key={i}
        />
      ))}
    </div>
  );
}
