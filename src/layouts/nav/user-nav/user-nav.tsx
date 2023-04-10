import Image from "next/image";
import ecommerceLogo from "@/assets/logo.svg";
import Search from "@/components/search/search";
import { FormEvent } from "react";
import useResponsive from "@/hooks/use-responsive";
import variables from "@/styles/variables.module.scss";
import IconAndText from "@/components/icon-and-text/icon-and-text";
import cart from "@/assets/category-icons/cart.svg";
import account from "@/assets/category-icons/account.svg";
import dropDownArrow from "@/assets/category-icons/drop down arrow.svg";
import styles from "./user-nav.module.scss";

export default function UserNav() {
  const isMobile = useResponsive(`(max-width: ${variables.widthMobile})`);

  function searchHandler(e: FormEvent<HTMLFormElement>) {}

  return (
    <nav className={styles.nav}>
      {!isMobile && (
        <Image alt="e-commerce" src={ecommerceLogo} width="111" sizes="111px" />
      )}

      <Search
        text="Search for products..."
        formSubmitHandler={searchHandler}
        extraClasses={styles["nav__search"]}
      />

      {!isMobile && (
        <div className={styles["nav__actions"]}>
          <div className={styles["nav__account--ctn"]}>
            <IconAndText
              text="Account"
              icon={account}
              iconExtraClasses={styles["nav__actions--image"]}
            />
            <Image
              alt="drop down arrow"
              src={dropDownArrow}
              width="20"
              height="12.35"
              sizes="20px"
            />
          </div>

          <IconAndText
            text="Cart"
            icon={cart}
            iconExtraClasses={styles["nav__actions--image"]}
          />
        </div>
      )}

      {isMobile && (
        <Image alt="Cart" src={cart} width="22.84" height="25" sizes="22.84" />
      )}
    </nav>
  );
}