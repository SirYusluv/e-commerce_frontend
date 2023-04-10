import CategorySec from "@/layouts/discover-page-sections/category-sec/category-sec";
import UserNav from "@/layouts/nav/user-nav/user-nav";
import styles from "./user.module.scss";

export default function UserPage() {
  return (
    <main className={styles["main-page"]}>
      <UserNav />
      <CategorySec />
    </main>
  );
}

// TODO: fetch supermarket category items and pass to CategorySec
export async function getStaticProps() {
  return {
    props: {},
  };
}
