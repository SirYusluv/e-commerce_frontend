import Button from "@/components/button/button";
import CartItem from "@/components/cart-item/cart-item";
import useRequest from "@/hooks/use-http";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import ItemDetailNav from "@/layouts/nav/item-detail-nav/item-detail-nav";
import { hideBackdrop } from "@/store/slices/backdrop-slice";
import { ACCESS_TOKEN, API_URL, HTTP_STATUS } from "@/util/data";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [sendRequest, _, isLoading, isError, errMsg, response] = useRequest();

  let total = 15000; // some dummy price

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    !token && router.replace("/auth/signin");
  }, []);

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
        const cart: ICartUndetailed[] = (response.cart?.items ||
          []) as ICartUndetailed[];
        cart.length && setCart(cart);
        return;
      }
    },
    [isLoading, errMsg, isError]
  );

  function removeItemFromCart(itemId: string, all: boolean) {
    sendRequest(`${API_URL}/cart/cart/${itemId}?all=${all}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    });
  }

  function incrementItemInCart(itemId: string) {
    sendRequest(`${API_URL}/cart/cart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
      body: {
        itemId,
        quantity: "1",
      },
    });
  }

  // INFO: should be changed to route to checkout page
  function checkOutBtnClickHandler() {
    router.push("/checkout");
  }

  return (
    <>
      <ItemDetailNav title="Carts" />
      {dialog}
      {isLoading && <p className="info">Loading...</p>}
      {!isLoading && !cart?.length && <p className="info">Cart is empty.</p>}

      <main className={styles.cart}>
        <div className={styles["cart__item"]}>
          {cart?.length &&
            cart.map(({ _id, itemId, quantity }, i) => (
              <CartItem
                key={_id}
                id={itemId}
                quantity={quantity}
                addBtnOnClick={(itemId) => {
                  incrementItemInCart(itemId);
                  if (cart.length) {
                    setCart((cart) => {
                      const newCart: ICartUndetailed[] = JSON.parse(
                        JSON.stringify(cart)
                      ) as ICartUndetailed[];
                      //   const newCart = [...cart!!];
                      newCart[i].quantity = newCart[i].quantity + 1;
                      return [...newCart];
                    });
                  }
                }}
                removeBtnOnClick={removeItemFromCart}
                reduceBtnOnClick={(itemId, all) => {
                  removeItemFromCart(itemId, all);
                  if (!all && cart.length) {
                    setCart((cart) => {
                      const newCart: ICartUndetailed[] = JSON.parse(
                        JSON.stringify(cart)
                      ) as ICartUndetailed[];
                      //   const newCart = [...cart!!];
                      newCart[i].quantity = newCart[i].quantity - 1;
                      return [...newCart];
                    });
                  }
                }}
              />
            ))}
        </div>

        {/* TODO: add pagination */}

        {cart?.length && (
          <div className={styles["summary"]}>
            <h4 className={styles["summary__title"]}>Cart Summary</h4>
            <div className={styles["summary__item-group"]}>
              <p>Item's count</p>
              <p>{cart?.length}</p>
            </div>

            <div className={styles["summary__item-group"]}>
              <p>Discount</p>
              <p>&#x20A6;0</p>
            </div>

            <div className={styles["summary__item-group"]}>
              <p>Sub-Total</p>
              <p>&#x20A6;{total}</p>
            </div>

            <div
              className={`${styles["summary__item-group"]} ${styles["summary__item-total"]}`}
            >
              <p>Total</p>
              <p>&#x20A6;{total}</p>
            </div>

            <Button
              text="Checkout"
              buttonClickHandler={checkOutBtnClickHandler}
              buttonType="main"
            />
          </div>
        )}
      </main>
    </>
  );
}
