import { ILimitedItem } from "@/layouts/section-limited/section-limited";
import { ACCESS_TOKEN, API_URL } from "@/util/data";
import Homepage from "../layouts/homepage";
import bag from "@/assets/bg-bag.png";
import nike from "@/assets/bg-nike.png";
import { IItem, IItemFromDb } from "@/components/item/item";
import blackRoundNeck from "@/assets/items images/black round neck.png";
import casualSweater from "@/assets/items images/casual sweater.png";
import gown from "@/assets/items images/gown.png";
import mensPolo from "@/assets/items images/mens polo 6 set.png";
import plainWhiteRoundNeck from "@/assets/items images/plain white roundneck.png";
import womensPolo from "@/assets/items images/womens polo.png";
import { useEffect } from "react";
import { useRouter } from "next/router";

const dummyLimited: [ILimitedItem, ILimitedItem, ILimitedItem] = [
  {
    image: nike,
    remainingCount: 4,
  },
  {
    image: bag,
    remainingCount: 2,
  },
  {
    image: nike,
    remainingCount: 1,
  },
];

const dummyItems: IItem[] = [
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

interface IProp {
  limited: ILimitedItem[];
  menCategory: IItem[];
}

export default function Home({ limited, menCategory }: IProp) {
  const router = useRouter();

  return <Homepage category={menCategory} limited={limited} />;
}

export async function getStaticProps() {
  // fetch limited items
  let limited: ILimitedItem[] | null = null;
  const limitedResponse = await fetch(
    `${API_URL}/auth/item?limited=true&limit=3`
  );

  if (limitedResponse.ok) {
    let items = (await limitedResponse.json()).items as any[];

    // expected to fetch 3 items from db
    if (items.length === 3) {
      limited = items.map(({ images, remainingCount }) => ({
        image: images[0],
        remainingCount,
      }));
    } else {
      limited = dummyLimited;
    }
  } else {
    limited = dummyLimited;
  }

  //fetch men categories => men because men is the first category shown  in UI
  let menCategory: IItem[] | null = null;
  const menCategoryResponse = await fetch(
    `${API_URL}/auth/item?category=men&topBought=true&limit=6`
  );

  if (menCategoryResponse.ok) {
    let items = (await menCategoryResponse.json()).items as IItemFromDb[];

    // expected to fetch 6 items from db
    if (items.length === 6) {
      menCategory = items.map(
        ({ images, remainingCount, _id, itemName, price }) => ({
          image: images[0],
          remainingCount,
          id: _id,
          name: itemName,
          price: price,
          reviewCount: Math.floor(Math.random() * 100) + 1, // random number from 1 - 99
          stars: Math.floor(Math.random() * 4) + 2, // random number from 2 - 5
        })
      );
    } else {
      menCategory = dummyItems;
    }
  } else {
    menCategory = dummyItems;
  }

  return {
    props: {
      limited,
      menCategory,
    },
    revalidate: 48 * 60 * 60, // every 48hrs
  };
}
