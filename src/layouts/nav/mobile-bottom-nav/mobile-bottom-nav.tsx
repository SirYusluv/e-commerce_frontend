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
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import { useDispatch } from "react-redux";
import { hideBackdrop } from "@/store/slices/backdrop-slice";

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

export function getBottomNavItemIndex(item: ButtomNavItemText) {
  const ind = bottomNavItems.findIndex((navText) => navText.text === item);
  return ind === -1 ? 1 : ind;
}

interface IProp {
  isActiveIndex: number;
}

export default function MobileBottomNav({ isActiveIndex }: IProp) {
  const [bottomNavActiveIndex, setBottomNavActiveIndex] =
    useState<number>(isActiveIndex);
  const [Modal, setModal] = useState<JSX.Element | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  function bottomItemClickHandler(i: number) {
    setBottomNavActiveIndex(i);
  }

  function removeModalAndBackdrop() {
    dispatch(hideBackdrop());
    setModal(null);
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
      // I've not implemented saved feature
      case "Saved":
        setModal(
          <AlertDialog
            message={"You dont have any saved item."}
            buttonPri="Ok"
            onButtonPriClick={removeModalAndBackdrop}
            backdropClickHandler={removeModalAndBackdrop}
          />
        );
        break;
      default:
        break;
    }
  }

  return (
    <>
      {Modal && Modal}
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
    </>
  );
}
