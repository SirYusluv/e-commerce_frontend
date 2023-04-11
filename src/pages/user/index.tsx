import CategorySec from "@/layouts/discover-page-sections/category-sec/category-sec";
import TopSellingItems from "@/layouts/discover-page-sections/top-selling-items/top-selling-items";
import UserNav from "@/layouts/nav/user-nav/user-nav";
import casualSweater from "@/assets/items images/casual sweater.png";
import { IItem } from "@/components/item/item";
import variables from "@/styles/variables.module.scss";
import styles from "./user.module.scss";
import useResponsive from "@/hooks/use-responsive";

const itemsList: IItem[] = [
  {
    id: "0",
    name: "Casual sweater",
    image: casualSweater,
    price: 773,
    remainingCount: 3,
    stars: 3,
    reviewCount: 3,
  },
  {
    id: "1",
    name: "Casual sweater",
    image: casualSweater,
    price: 773,
    remainingCount: 3,
    stars: 3,
    reviewCount: 3,
  },
  {
    id: "1",
    name: "Casual sweater",
    image: casualSweater,
    price: 773,
    remainingCount: 3,
    stars: 3,
    reviewCount: 3,
  },
];

export default function UserPage() {
  const isTablet = useResponsive(`(max-width: ${variables.widthTablet})`);
  return (
    <main className={styles["main-page"]}>
      <UserNav />
      <CategorySec />
      <TopSellingItems
        items={isTablet ? [itemsList[0], itemsList[1]] : itemsList}
      />
    </main>
  );
}

// TODO: fetch supermarket category items and pass to CategorySec
export async function getStaticProps() {
  return {
    props: {},
  };
}
