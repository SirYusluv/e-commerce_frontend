import { IItemFromDb } from "@/components/item/item";
import useRequest from "@/hooks/use-http";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import ItemDetailNav from "@/layouts/nav/item-detail-nav/item-detail-nav";
import { hideBackdrop } from "@/store/slices/backdrop-slice";
import { ACCESS_TOKEN, API_URL, HTTP_STATUS } from "@/util/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import variables from "@/styles/variables.module.scss";
import cartLogo from "@/assets/category-icons/cart.svg";
import styles from "./item.module.scss";
import useResponsive from "@/hooks/use-responsive";
import ImageCtn from "@/components/item-details/image-ctn/image-ctn";
import Info from "@/components/item-details/info/info";
import Detail from "@/components/item-details/detail/detail";
import Button from "@/components/button/button";

export default function ItemPage() {
  const [item, setItem] = useState<IItemFromDb | null>(null);
  const [dialog, setDialog] = useState<JSX.Element | null>(null);
  const router = useRouter();
  const isTablet = useResponsive(`(max-width: ${variables.widthTablet})`);
  const dispatch = useDispatch();
  const [sendRequest, _, isLoading, isError, errMsg, response] = useRequest();

  let content: JSX.Element | null = null;

  if (item) {
    content = (
      <>
        <ImageCtn
          image1={`${API_URL}/${item.images[0]}`}
          image2={`${API_URL}/${item.images[1]}`}
          image3={`${API_URL}/${item.images[2]}`}
        />

        <div className={styles["detail__info"]}>
          <Info
            itemName={item.itemName}
            price={item.price}
            remainingCount={item.remainingCount}
            reviewCount={23}
            stars={4}
          />
          <Detail desc1={item.itemDescription1} desc2={item.itemDescription2} />
        </div>
      </>
    );
  }

  if (item && isTablet) {
    content = (
      <>
        <div className={styles["main__top--tablet"]}>
          <ImageCtn
            image1={`${API_URL}/${item.images[0]}`}
            image2={`${API_URL}/${item.images[1]}`}
            image3={`${API_URL}/${item.images[2]}`}
          />

          <Info
            itemName={item.itemName}
            price={item.price}
            remainingCount={item.remainingCount}
            reviewCount={23}
            stars={4}
          />
        </div>

        <Detail desc1={item.itemDescription1} desc2={item.itemDescription2} />
      </>
    );
  }

  useEffect(() => {
    const itemId = window.location.pathname.split("/")[2];
    sendRequest(`${API_URL}/item/items`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
      body: {
        itemId: String(itemId) || "",
      },
    });
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

      if (response.status === HTTP_STATUS.ok) {
        const items: IItemFromDb = ((response.items || []) as IItemFromDb[])[0];
        items && setItem(items);
        return;
      }
    },
    [isLoading, errMsg, isError]
  );

  function addItemToCart() {
    sendRequest(`${API_URL}/cart/cart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
      body: {
        itemId: item?._id || "",
        quantity: "1",
      },
    });
  }

  return (
    <>
      <ItemDetailNav title="Product detail" />
      {dialog}
      {isLoading && <p className={styles.info}>Loading...</p>}
      {!isLoading && !item && <p className={styles.info}>Item not found.</p>}

      <main className={styles.main}>
        {content}
        {!isLoading && item && (
          <Button
            extraClasses={styles.btn}
            text="Add to cart"
            image={cartLogo}
            buttonClickHandler={addItemToCart}
            buttonType="image-with-btn"
          />
        )}
      </main>
    </>
  );
}

// INFO: was going to use this but unfofrtunatrly i can't access bearer token from server
// export const getServerSideProps: GetServerSideProps<{
//   item: IItemFromDb;
// }> = async (context) => {
//   const itemId = context.params?.itemId;

//   let item: IItemFromDb[] | null = null;
//   const itemResponse = await fetch(`${API_URL}/item/items`, {});

//   if (limitedResponse.ok) {
// let items = (await limitedResponse.json()).items as any[];
// expected to fetch 3 items from db
// if (items.length === 3) {
//   limited = items.map(({ images, remainingCount }) => ({
//     image: images[0],
//     remainingCount,
//   }));
// }
//   } else {
// limited = dummyLimited;
//   }

//   return {
//     props: { item: {} as IItemFromDb },
//   };
// };
