import Button from "@/components/button/button";
import Input from "@/components/input/input";
import useRequest from "@/hooks/use-http";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import ItemDetailNav from "@/layouts/nav/item-detail-nav/item-detail-nav";
import { hideBackdrop } from "@/store/slices/backdrop-slice";
import { ACCESS_TOKEN, API_URL } from "@/util/data";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./checkout.module.scss";

export default function Checkout() {
  const [dialog, setDialog] = useState<JSX.Element | null>(null);
  const [sendRequest, _, isLoading, isError, errMsg, response] = useRequest();
  const cardNumberRef = useRef<HTMLInputElement | null>(null);
  const monthRef = useRef<HTMLInputElement | null>(null);
  const yearRef = useRef<HTMLInputElement | null>(null);
  const cvvRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    !token && router.replace("/auth/signin");
  }, []);

  function payBtnClickHandler() {
    if (isLoading) return;

    const cardNumber = cardNumberRef.current?.value;
    const month = monthRef.current?.value;
    const year = yearRef.current?.value;
    const cvv = cvvRef.current?.value;

    if (!cardNumber || !month || !year || !cvv)
      return setDialog(
        <AlertDialog
          message="All input fields must be filled"
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

    if (cardNumber.length < 12)
      return setDialog(
        <AlertDialog
          message="Invalid card provided"
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

    if (Number(month.length) < 1 || Number(month.length) > 12)
      return setDialog(
        <AlertDialog
          message="Invalid month"
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

    if (cvv.length < 3 || cvv.length > 4)
      return setDialog(
        <AlertDialog
          message="Invalid cvv"
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

    setTimeout(() => {
      orderItemInCart();
    }, 1000);
  }

  function orderItemInCart() {
    sendRequest(`${API_URL}/order/order`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    });
    router.push("/order");
  }

  return (
    <>
      <ItemDetailNav title="Credit card detail" />
      {dialog}

      <main className={styles.card}>
        <Input text="Card Number" inputRef={cardNumberRef} inputType="number" />

        <Input text="Month" inputRef={monthRef} inputType="number" />

        <Input text="Year" inputRef={yearRef} inputType="number" />

        <div>
          <Input text="cvv" inputRef={cvvRef} inputType="number" />
          <p>3 or 4 digits</p>
        </div>

        <Button
          text="Pay"
          isActive={!isLoading}
          buttonClickHandler={payBtnClickHandler}
          type="submit"
          buttonType="main"
        />
      </main>
    </>
  );
}
