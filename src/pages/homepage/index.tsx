import Header from "@/layouts/header/header";
import SectionBenefits from "@/layouts/section-benefits/section-benefits";
import SectionItems from "@/layouts/section-items/section-items";
import SectionLimited from "@/layouts/section-limited/section-limited";
import Head from "next/head";
import blackRoundNeck from "@/assets/items images/black round neck.png";
import casualSweater from "@/assets/items images/casual sweater.png";
import gown from "@/assets/items images/gown.png";
import mensPolo from "@/assets/items images/mens polo 6 set.png";
import plainWhiteRoundNeck from "@/assets/items images/plain white roundneck.png";
import womensPolo from "@/assets/items images/womens polo.png";
import { useState } from "react";
import { IItem } from "@/components/item/item";
import SectionReview from "@/layouts/section-review/section-review";

const categories: [string, string, string, string, string] = [
  "Clothing",
  "Men",
  "Women",
  "Grocery",
  "Lifestyle",
];

const itemList: IItem[] = [
  {
    id: "1",
    name: "Casual Sweater",
    price: 5000,
    remainingCount: 2,
    reviewCount: 791,
    stars: 5,
    image: casualSweater,
  },
  {
    id: "2",
    name: "Black round neck",
    price: 5060,
    remainingCount: 2,
    reviewCount: 91,
    stars: 3,
    image: blackRoundNeck,
  },
  {
    id: "3",
    name: "Gown",
    price: 2500,
    remainingCount: 2,
    reviewCount: 791,
    stars: 2,
    image: gown,
  },
  {
    id: "4",
    name: "Men's polo 6 set",
    price: 5000,
    remainingCount: 2,
    reviewCount: 791,
    stars: 4,
    image: mensPolo,
  },
  {
    id: "5",
    name: "Plain white roundneck",
    price: 650,
    remainingCount: 63,
    reviewCount: 79,
    stars: 4,
    image: plainWhiteRoundNeck,
  },
  {
    id: "6",
    name: "Women's polo",
    price: 5000,
    remainingCount: 2,
    reviewCount: 791,
    stars: 5,
    image: womensPolo,
  },
];

export default function Homepage() {
  const [items, setItems] = useState<IItem[]>(itemList);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function loadItems(_: string) {
    setIsLoading(true);
    setTimeout(() => {
      setItems([...itemList]);
      setIsLoading(false);
    }, 1000);
  }

  return (
    <>
      <Head>
        <title>E-Commerce</title>
      </Head>
      <>
        <Header />
        <SectionBenefits />
        <SectionLimited />
        <SectionItems
          categories={categories}
          items={items}
          loadItems={loadItems}
          dataIsLoading={isLoading}
        />
        <SectionReview />
      </>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 48 * 60 * 60, // every 48hrs
  };
}
