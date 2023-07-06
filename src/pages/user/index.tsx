import CategorySec from "@/layouts/discover-page-sections/category-sec/category-sec";
import TopSellingItems from "@/layouts/discover-page-sections/top-selling-items/top-selling-items";
import UserNav from "@/layouts/nav/user-nav/user-nav";
import casualSweater from "@/assets/items images/casual sweater.png";
import { IItem, IItemFromDb } from "@/components/item/item";
import variables from "@/styles/variables.module.scss";
import styles from "./user.module.scss";
import useResponsive from "@/hooks/use-responsive";
import LimitedInStock from "@/layouts/discover-page-sections/limited-in-stock/limited-in-stock";
import Footer from "@/layouts/footer/footer";
import MobileBottomNav, {
  getButtomNavItemIndex,
} from "@/layouts/nav/mobile-bottom-nav/mobile-bottom-nav";
import Head from "next/head";
import { ACCESS_TOKEN, API_URL, SAMPLE_TOKEN } from "@/util/data";
import { useEffect } from "react";
import { useRouter } from "next/router";

// dummy list
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

interface IProps {
  supermarketItems: IItem[];
  topSellingItems: IItem[];
  limitedInStockItems: IItem[];
}

export default function UserPage({
  supermarketItems,
  topSellingItems,
  limitedInStockItems,
}: IProps) {
  const router = useRouter();
  const isTablet = useResponsive(`(max-width: ${variables.widthTablet})`);
  const isMobile = useResponsive(`(max-width: ${variables.widthMobile})`);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    !token && router.replace("/auth/signin");
  }, []);

  return (
    <>
      <Head>
        <title>E-commerce</title>
      </Head>
      <main className={styles["main-page"]}>
        <UserNav />
        <CategorySec supermarketItems={supermarketItems} />
        <TopSellingItems
          items={
            isTablet
              ? [topSellingItems[0], topSellingItems[1]]
              : topSellingItems
          }
        />
        <LimitedInStock
          items={
            isTablet
              ? [limitedInStockItems[0], limitedInStockItems[1]]
              : limitedInStockItems
          }
        />
        {isMobile && (
          <MobileBottomNav isActiveIndex={getButtomNavItemIndex("Home")} />
        )}
        <Footer />
      </main>
    </>
  );
}

async function fetchItemsForStaticProps(
  url: string,
  body?: BodyInit
): Promise<IItemFromDb[]> {
  let itemsJSON = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SAMPLE_TOKEN}`,
    },
    method: "POST",
    body,
  });
  const itemDb = await itemsJSON.json();
  const itemsFromDb: IItemFromDb[] = itemDb.items;

  return itemsFromDb;
}

export async function getStaticProps() {
  const supermarketItems: IItem[] = [];
  const topSellingItems: IItem[] = [];
  const limitedInStockItems: IItem[] = [];

  // fetch supermarket
  const supermarketItemsFromDb: IItemFromDb[] = await fetchItemsForStaticProps(
    `${API_URL}/item/items?limit=2`,
    JSON.stringify({
      category: "supermarket",
    })
  );

  // populate supermarket
  // i need at least 2 items
  if (supermarketItemsFromDb?.length && supermarketItemsFromDb?.length > 1) {
    for (let i = 0; i < 2; i++) {
      const supermarketItem: IItem = {
        id: supermarketItemsFromDb[i]._id,
        name: supermarketItemsFromDb[i].itemName,
        image: `${API_URL}/${supermarketItemsFromDb[i].images[0]}`,
        price: supermarketItemsFromDb[i].price,
        remainingCount: supermarketItemsFromDb[i].remainingCount,
        reviewCount: Math.floor(Math.random() * 100) + 1,
        stars: Math.floor(Math.random() * 4) + 2, // random number from 2 - 5
      };
      supermarketItems.push(supermarketItem);
    }
  } else {
    supermarketItems.push(itemsList[0]);
    supermarketItems.push(itemsList[1]);
  }

  // fetch top selling
  const topSellingItemsFromDb: IItemFromDb[] = await fetchItemsForStaticProps(
    `${API_URL}/item/items?limit=3&topSelling=true`
  );

  // populate top selling
  // i need at least 3 items
  if (topSellingItemsFromDb?.length && topSellingItemsFromDb?.length > 2) {
    for (let i = 0; i < 3; i++) {
      const topSellingItem: IItem = {
        id: topSellingItemsFromDb[i]._id,
        name: topSellingItemsFromDb[i].itemName,
        image: `${API_URL}/${topSellingItemsFromDb[i].images[0]}`,
        price: topSellingItemsFromDb[i].price,
        remainingCount: topSellingItemsFromDb[i].remainingCount,
        reviewCount: Math.floor(Math.random() * 100) + 1,
        stars: Math.floor(Math.random() * 4) + 2, // random number from 2 - 5
      };
      topSellingItems.push(topSellingItem);
    }
  } else {
    topSellingItems.push(itemsList[0]);
    topSellingItems.push(itemsList[1]);
    topSellingItems.push(itemsList[2]);
  }

  // fetch limited in stock
  const limitedInStockItemsFromDb: IItemFromDb[] =
    await fetchItemsForStaticProps(
      `${API_URL}/item/items?limit=3&limitedInStock=true`
    );

  // populate limited in stock
  // i need at least 3 items
  if (
    limitedInStockItemsFromDb?.length &&
    limitedInStockItemsFromDb?.length > 2
  ) {
    for (let i = 0; i < 3; i++) {
      const limitedInStockItem: IItem = {
        id: limitedInStockItemsFromDb[i]._id,
        name: limitedInStockItemsFromDb[i].itemName,
        image: `${API_URL}/${limitedInStockItemsFromDb[i].images[0]}`,
        price: limitedInStockItemsFromDb[i].price,
        remainingCount: limitedInStockItemsFromDb[i].remainingCount,
        reviewCount: Math.floor(Math.random() * 100) + 1,
        stars: Math.floor(Math.random() * 4) + 2, // random number from 2 - 5
      };
      limitedInStockItems.push(limitedInStockItem);
    }
  } else {
    limitedInStockItems.push(itemsList[0]);
    limitedInStockItems.push(itemsList[1]);
    limitedInStockItems.push(itemsList[2]);
  }

  return {
    props: {
      supermarketItems,
      topSellingItems,
      limitedInStockItems,
    },
    revalidate: 24 * 60 * 60,
  };
}
