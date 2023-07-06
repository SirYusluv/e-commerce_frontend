import XButton from "@/components/x-button/x-button";
import Backdrop, { removeBDStyleFromBD } from "@/layouts/backdrop/backdrop";
import { hideBackdrop, showBackdrop } from "@/store/slices/backdrop-slice";
import { hideNav } from "@/store/slices/mobile-nav-slice";
import { NAV_ITEMS } from "@/util/data";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./mobile-nav.module.scss";

export default function MobileNav() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showBackdrop());
  }, []);

  function closeMobileNav() {
    removeBDStyleFromBD();
    dispatch(hideNav());
    dispatch(hideBackdrop());
  }

  return (
    <>
      <Backdrop onBackdropClick={closeMobileNav} />
      <div className={styles["mobile-nav"]}>
        <XButton
          onXButtonClick={closeMobileNav}
          extraClasses={styles["mobile-nav__x-btn"]}
        />
        <div className={styles["mobile-nav__navi"]}>
          {NAV_ITEMS.map((nav_item, i) => (
            <p key={i}>{nav_item}</p>
          ))}
        </div>
      </div>
    </>
  );
}
