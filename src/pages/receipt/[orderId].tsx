import logo from "@/assets/logo.svg";
import useRequest from "@/hooks/use-http";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import ItemDetailNav from "@/layouts/nav/item-detail-nav/item-detail-nav";
import { hideBackdrop } from "@/store/slices/backdrop-slice";
import { ACCESS_TOKEN, API_URL, HTTP_STATUS } from "@/util/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IOrderFromDb } from "../order";
import styles from "./receipt.module.scss";

export default function Receipt() {
  const [orders, setOrders] = useState<IOrderFromDb[] | null>(null);
  const [dialog, setDialog] = useState<JSX.Element | null>(null);
  const dispatch = useDispatch();
  const [sendRequest, _, isLoading, isError, errMsg, response] = useRequest();

  useEffect(() => {
    sendRequest(`${API_URL}/order/receipts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
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

      if (response.status === HTTP_STATUS.ok) {
        const orders: IOrderFromDb[] = (response.receipts ||
          []) as IOrderFromDb[];
        orders.length && setOrders(orders);
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
    [isLoading, errMsg, isError]
  );

  let ordersToDisplay: IOrderFromDb | null | undefined = null;
  let price = 0;
  let quantity = 0;

  if (orders) {
    const receiptId = window.location.pathname.split("/")[2];
    ordersToDisplay = orders.find(({ _id }) => receiptId === _id);

    ordersToDisplay?.items.map(({ quantity: q, priceEach }) => {
      price += q * priceEach;
      quantity += q;
    });
  }
  console.log(ordersToDisplay);

  return (
    <>
      <ItemDetailNav title="Receipt" />
      {dialog}
      {isLoading && <p className="info">Loading...</p>}
      {!isLoading && !ordersToDisplay && (
        <p className="info">Receipt not found.</p>
      )}

      {ordersToDisplay && (
        <main className={styles.receipt}>
          <div className={styles["receipt__receipt"]}>
            <Image
              alt="E-commerce"
              src={logo}
              className={styles["receipt__image"]}
            />
            <div>
              <h2 className={styles["receipt__title"]}>Transaction Receipt</h2>
              <div className={styles["receipt__underline"]}></div>
            </div>

            <div className={styles["receipt__content"]}>
              <div className={styles["receipt__item"]}>
                <p className={styles["receipt__subject"]}>Transaction id: </p>
                <p className={styles["receipt__value"]}>
                  {" "}
                  {ordersToDisplay._id}
                </p>
              </div>

              <div className={styles["receipt__item"]}>
                <p className={styles["receipt__subject"]}>Transaction type: </p>
                <p className={styles["receipt__value"]}>order payment</p>
              </div>

              <div className={styles["receipt__item"]}>
                <p className={styles["receipt__subject"]}>Transaction date: </p>
                <p className={styles["receipt__value"]}>
                  {ordersToDisplay.datePaid}
                </p>
              </div>

              <div className={styles["receipt__item"]}>
                <p className={styles["receipt__subject"]}>Item count: </p>
                <p className={styles["receipt__value"]}>{quantity}</p>
              </div>

              <div className={styles["receipt__item"]}>
                <p className={styles["receipt__subject"]}>Amount: </p>
                <p className={styles["receipt__value"]}>&#x20A6;{price}</p>
              </div>

              <div className={styles["receipt__item"]}>
                <p className={styles["receipt__subject"]}>Status: </p>
                <p className={styles["receipt__value"]}>Success</p>
              </div>
            </div>

            <div>
              <div className={styles["receipt__underline"]}></div>
              <h2 className={styles["receipt__title"]}>
                Generated from E-commerce
              </h2>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
