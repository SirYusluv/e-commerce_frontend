import Image from "next/image";
import logo from "@/assets/logo.svg";
import hamburger from "@/assets/hamburger.png";
import Search from "@/components/search/search";
import { useRouter } from "next/router";
import { NAV_ITEMS } from "@/util/data";
import variables from "@/styles/variables.module.scss";
import styles from "./nav.module.scss";
import useResponsive from "@/hooks/use-responsive";
import MobileNav from "./mobile-nav/mobile-nav";
import { useDispatch, useSelector } from "react-redux";
import { showNav } from "@/store/slices/mobile-nav-slice";
import { RootState } from "@/store/store";

export default function Nav() {
  const router = useRouter();
  const dispatch = useDispatch();
  const showMobileNav = useSelector(
    (state: RootState) => state.mobileNav.showMobileNav
  );
  const isMobile = useResponsive(`(max-width: ${variables.widthMobile})`);

  return (
    <nav className={styles.nav}>
      {isMobile && showMobileNav && <MobileNav />}

      {!isMobile && (
        <div className={styles.navi}>
          {NAV_ITEMS.map((nav_item, i) => (
            <p key={i} className="link">
              {nav_item}
            </p>
          ))}
        </div>
      )}

      <div className={styles["mobile-nav"]}>
        <div className={styles["mobile__view"]}></div>
        <Image alt="E-commerce" src={logo} />
        <Image
          onClick={() => {
            dispatch(showNav());
          }}
          className={styles["mobile__view"]}
          alt="hamburger"
          src={hamburger}
        />
      </div>

      <Search
        onSearchClick={() => router.push("/auth/signin")}
        extraClasses={styles.search}
      />
    </nav>
  );
}
