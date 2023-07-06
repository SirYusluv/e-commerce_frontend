import Link from "next/link";
import styles from "./desktop-drop-down.module.scss";
import { ACCESS_TOKEN } from "@/util/data";
import { useRouter } from "next/router";

interface IProp {
  showDropDown: boolean;
  setShowDropDown: (showDropDown: false) => void;
}

export default function DesktopDropDown({
  showDropDown,
  setShowDropDown,
}: IProp) {
  const router = useRouter();

  function logoutUser() {
    localStorage.removeItem(ACCESS_TOKEN);
    router.push("/auth/signin");
  }

  return showDropDown ? (
    <div className={styles["drop-down"]}>
      <Link onClick={() => setShowDropDown(false)} href="/order">
        Orders
      </Link>
      <p
        className="link"
        onClick={() => {
          setShowDropDown(false);
          logoutUser();
        }}
      >
        Logout
      </p>
    </div>
  ) : (
    <></>
  );
}
