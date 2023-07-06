import MobileBottomNav, {
  getButtomNavItemIndex,
} from "@/layouts/nav/mobile-bottom-nav/mobile-bottom-nav";
import styles from "./account.module.scss";
import useResponsive from "@/hooks/use-responsive";
import variables from "@/styles/variables.module.scss";
import { useRouter } from "next/router";
import { ACCESS_TOKEN } from "@/util/data";

export default function Account() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    router.push("/");
  }

  const isMobile = useResponsive(`(max-width: ${variables.widthMobile})`);
  return (
    <>
      <div onClick={logout} className={styles["account__item"]}>
        Logout
      </div>
      {isMobile && (
        <MobileBottomNav isActiveIndex={getButtomNavItemIndex("Account")} />
      )}
    </>
  );
}
