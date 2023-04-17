import CartItem from "@/components/cart-item/cart-item";
import useRequest from "@/hooks/use-http";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import ItemDetailNav from "@/layouts/nav/item-detail-nav/item-detail-nav";
import { hideBackdrop } from "@/store/slices/backdrop-slice";
import { ACCESS_TOKEN, API_URL, HTTP_STATUS } from "@/util/data";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./cart.module.scss";

interface ICartUndetailed {
  itemId: string;
  _id: string;
  quantity: number;
}

export default function Cart() {
  const [cart, setCart] = useState<ICartUndetailed[] | null>(null);
  const [dialog, setDialog] = useState<JSX.Element | null>(null);
  const dispatch = useDispatch();
  const [sendRequest, _, isLoading, isError, errMsg, response] = useRequest();

  useEffect(() => {
    sendRequest(`${API_URL}/cart/cart`, {
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
        const cart: ICartUndetailed[] = (response.cart?.items ||
          []) as ICartUndetailed[];
        cart.length && setCart(cart);
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

  return (
    <>
      <ItemDetailNav title="Orders" />
      {dialog}
      {isLoading && <p className="info">Loading...</p>}
      {!isLoading && !cart?.length && <p className="info">Cart is empty.</p>}

      <main className={styles.cart}>
        <div className={styles["cart__item"]}>
          {cart?.length &&
            cart.map(({ _id, itemId, quantity }) => (
              <CartItem
                key={_id}
                id={itemId}
                quantity={quantity}
                editQtyBtnOnClick={(type) => {}}
                removeBtnOnClick={() => {}}
              />
            ))}
        </div>
        {/* TODO: add pagination */}
        <div></div>
      </main>
    </>
  );
}
