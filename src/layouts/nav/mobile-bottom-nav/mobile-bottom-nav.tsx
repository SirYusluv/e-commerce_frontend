import home from "@/assets/home.png";
import saved from "@/assets/saved.png";
import orders from "@/assets/orders.png";
import account from "@/assets/account.png";
import BottomNavItem, {
  ButtomNavItemText,
  IBottomNavItem,
} from "./bottom-nav-item/bottom-nav-item";
import { useState } from "react";
import styles from "./mobile-bottom-nav.module.scss";
import { useRouter } from "next/router";

export const bottomNavItems: IBottomNavItem[] = [
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

export function getButtomNavItemIndex(item: ButtomNavItemText) {
  const ind = bottomNavItems.findIndex((navText) => navText.text === item);
  return ind === -1 ? 1 : ind;
}

interface IProp {
  isActiveIndex: number;
}

export default function MobileBottomNav({ isActiveIndex }: IProp) {
  const [bottomNavActiveIndex, setBottomNavActiveIndex] =
    useState<number>(isActiveIndex);
  const router = useRouter();

  function bottomItemClickHandler(i: number) {
    setBottomNavActiveIndex(i);
  }

  function changeView(routeName: ButtomNavItemText) {
    switch (routeName) {
      case "Home":
        router.push("/user");
        break;
      case "Orders":
        router.push("/order");
        break;
      case "Account":
        router.push("/account");
        break;
      case "Saved":
      default:
        break;
    }
  }

  return (
    <div className={styles["bottom-nav"]}>
      {bottomNavItems.map(({ icon, text }, i) => (
        <BottomNavItem
          isActive={i === bottomNavActiveIndex ? true : false}
          icon={icon}
          text={text}
          clickHandler={() => {
            setBottomNavActiveIndex(i);
            changeView(text);
          }}
          key={i}
        />
      ))}
    </div>
  );
}
