import OrderedItemCard, {
  IOrderedItemCardProp,
} from "@/components/ordered-item-card/ordered-item-card";
import useRequest from "@/hooks/use-http";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import ItemDetailNav from "@/layouts/nav/item-detail-nav/item-detail-nav";
import { hideBackdrop } from "@/store/slices/backdrop-slice";
import { ACCESS_TOKEN, API_URL, HTTP_STATUS } from "@/util/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./order.module.scss";

export interface IItemsForOrder {
  _id: string;
  itemId: string;
  itemName: string;
  priceEach: number;
  quantity: number;
}

export interface IOrderFromDb {
  _id: string;
  owner: string;
  paidBy: string;
  datePaid: string;
  items: IItemsForOrder[];
  _v: number;
}

export default function Order() {
  const [orders, setOrders] = useState<IOrderFromDb[] | null>(null);
  const [dialog, setDialog] = useState<JSX.Element | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [sendRequest, _, isLoading, isError, errMsg, response] = useRequest();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    !token && router.replace("/auth/signin");
  }, []);

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

  let ordersToDisplay: IOrderedItemCardProp[] = [];

  if (orders) {
    orders.map(function ({ _id, datePaid, items, owner, paidBy }) {
      items.map(function ({ _id: _, itemId, itemName, priceEach, quantity }) {
        const thisOrder: IOrderedItemCardProp = {
          _id,
          date: datePaid,
          image: "",
          itemName,
          price: priceEach,
          status: "delivered",
        };
        ordersToDisplay.push(thisOrder);
        return thisOrder;
      });
    });
  }

  return (
    <>
      <ItemDetailNav title="Orders" />
      {dialog}
      {isLoading && <p className="info">Loading...</p>}
      {!isLoading && !orders?.length && (
        <p className="info">No order has been made.</p>
      )}

      <main className={`${styles.cart} link`}>
        {ordersToDisplay.map(
          ({ _id, date, image, itemName, price, status }) => (
            <OrderedItemCard
              _id={_id}
              date={date}
              image={image}
              itemName={itemName}
              price={price}
              status={status}
            />
          )
        )}
      </main>
    </>
  );
}
