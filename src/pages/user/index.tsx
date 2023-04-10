import UserNav from "@/layouts/nav/user-nav/user-nav";
import styles from "./user.module.scss";

export default function UserPage() {
  return (
    <main className={styles["main-page"]}>
      <UserNav />
    </main>
  );
}
