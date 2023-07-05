import Header from "@/layouts/header/header";
import SectionBenefits from "@/layouts/section-benefits/section-benefits";
import SectionItems from "@/layouts/section-items/section-items";
import SectionLimited, {
  ILimitedItem,
} from "@/layouts/section-limited/section-limited";
import Head from "next/head";
import { useEffect, useState } from "react";
import { IItem, IItemFromDb } from "@/components/item/item";
import SectionReview from "@/layouts/section-review/section-review";
import Footer from "@/layouts/footer/footer";
import { useRouter } from "next/router";
import useRequest from "@/hooks/use-http";
import { API_URL, HTTP_STATUS } from "@/util/data";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import { useDispatch } from "react-redux";
import { hideBackdrop } from "@/store/slices/backdrop-slice";

interface IProp {
  limited: ILimitedItem[];
  category: IItem[];
}

const categories: [string, string, string, string, string] = [
  "Men",
  "Women",
  "Clothing",
  "Grocery",
  "Lifestyle",
];

export default function Homepage({ limited, category }: IProp) {
  const [items, setItems] = useState<IItem[]>(category);
  const [dialog, setDialog] = useState<null | JSX.Element>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [sendRequest, _, isLoading, isError, errMsg, response] = useRequest();

  useEffect(() => {
    if (router.pathname === "/homepage") router.replace("/");
  }, []);

  useEffect(
    function () {
      if (isLoading) return;

      if (isError || errMsg) {
        setDialog(
          <AlertDialog
            message={errMsg || "Error occurred."}
            buttonPri="Ok"
            backdropClickHandler={() => {
              setDialog(null);
              dispatch(hideBackdrop());
            }}
            onButtonPriClick={() => {
              setDialog(null);
              dispatch(hideBackdrop());
            }}
          />
        );
        return;
      }

      if (response.status === HTTP_STATUS.ok) {
        const items: IItem[] = (response.items as IItemFromDb[]).map(
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
        setItems(items);
        return;
      }

      response.message &&
        setDialog(
          <AlertDialog
            message={response.message}
            buttonPri="Ok"
            backdropClickHandler={() => {
              setDialog(null);
              dispatch(hideBackdrop());
            }}
            onButtonPriClick={() => {
              setDialog(null);
              dispatch(hideBackdrop());
            }}
          />
        );
    },
    [isLoading, isError, errMsg]
  );

  function loadItems(categoryToLoad: string) {
    const toLoad = categoryToLoad.toLowerCase();

    sendRequest(
      `${API_URL}/auth/item?category=${toLoad}&topBought=true&limit=6`,
      {
        headers: {},
      }
    );
  }

  return (
    <>
      <Head>
        <title>E-Commerce</title>
      </Head>
      <>
        {dialog}
        <Header />
        <SectionBenefits />
        <SectionLimited limitedItems={limited} />
        <SectionItems
          categories={categories}
          items={items}
          loadItems={loadItems}
          dataIsLoading={isLoading}
        />
        <SectionReview />
        <Footer />
      </>
    </>
  );
}
