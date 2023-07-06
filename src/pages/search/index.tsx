import Item, { IItemFromDb } from "@/components/item/item";
import Pagination from "@/components/pagination/pagination";
import useRequest from "@/hooks/use-http";
import useResponsive from "@/hooks/use-responsive";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import Footer from "@/layouts/footer/footer";
import UserNav from "@/layouts/nav/user-nav/user-nav";
import { hideBackdrop } from "@/store/slices/backdrop-slice";
import variables from "@/styles/variables.module.scss";
import { ACCESS_TOKEN, API_URL, HTTP_STATUS } from "@/util/data";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./search.module.scss";

export default function Seaarch() {
  const [items, setItems] = useState<IItemFromDb[] | null>([]);
  const [dialog, setDialog] = useState<JSX.Element | null>(null);
  const [itemPageDisplayNum, setItemPageDisplayNum] = useState(0); // 0 is 1st item, 1 - 2nd ...
  const [itemsState, setItemsState] = useState<JSX.Element | null>(
    <p className={styles["page__info"]}>Loading...</p>
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const isMobile = useResponsive(`(max-width: ${variables.widthMobile})`);
  const isTablet = useResponsive(`(max-width: ${variables.widthTablet})`);
  const [sendRequest, _, isLoading, isError, errMsg, response] = useRequest();
  const itemsToShowCount = isTablet ? 10 : 9;

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    !token && router.replace("/auth/signin");
  }, []);

  useEffect(function () {
    if (!window.location.search?.split("query=")[1]) {
      router.replace("/user");
    }
  }, []);

  useEffect(
    function () {
      const query = router.query.query as string;
      if (!query) return;

      // page is basicly num of items to skip, so it's pageNum * numOfItemPerPage => written in code below
      sendRequest(
        `${API_URL}/item/items?limit=${itemsToShowCount}&page=${
          itemPageDisplayNum * itemsToShowCount
        }`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)!!}`,
          },
          body: {
            itemName: query,
          },
        }
      );
    },
    [router.query.query, itemsToShowCount, itemPageDisplayNum]
  );

  useEffect(
    function () {
      if (isLoading) return;

      if (!response.items?.length && router.query.query)
        setItemsState(
          <p className={styles["page__info"]}>
            "{router.query.query}" not found!
          </p>
        );
      else setItemsState(null);

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
        setItems(response.items as IItemFromDb[]);
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

  return (
    <>
      {dialog}
      <div className={styles.page}>
        <UserNav />

        {itemsState}

        <main className={styles.main}>
          <div className={`${styles.items} ${isLoading ? "low-opacity" : ""}`}>
            {items?.length &&
              items.map(({ _id, itemName, remainingCount, price, images }) => (
                <Link key={_id} href={`/item/${_id}`}>
                  <Item
                    id={_id}
                    name={itemName}
                    price={price}
                    remainingCount={remainingCount}
                    reviewCount={23}
                    stars={4}
                    image={`${API_URL}/${images[0]}`}
                  />
                </Link>
              ))}
          </div>

          {(response?.count || 0) > itemsToShowCount && (
            <Pagination
              activeIndex={itemPageDisplayNum}
              toShowCount={Math.ceil(response.count / itemsToShowCount)}
              startNumFrom={1} // always start from 1 since this is not a very big app
              onPagiClick={(num) => setItemPageDisplayNum(num)}
            />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
