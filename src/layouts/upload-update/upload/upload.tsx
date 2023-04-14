import Button from "@/components/button/button";
import Input from "@/components/input/input";
import useGetUserData from "@/hooks/use-get-user-data";
import useRequest from "@/hooks/use-http";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import { hideBackdrop } from "@/store/slices/backdrop-slice";
import { ACCESS_TOKEN, API_URL, HTTP_STATUS } from "@/util/data";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./upload.module.scss";

export default function Upload() {
  const [dialog, setDialog] = useState<JSX.Element | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [sendRequest, _, isLoading, isError, errMsg, response] = useRequest();
  const user = useGetUserData();

  // INFO: every pages must have  this
  useEffect(
    function () {
      if (!user) {
        localStorage.removeItem(ACCESS_TOKEN);
        router.replace("/auth/signin");
      }

      console.log(user);
    },
    [user]
  );

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

      if (response.status === HTTP_STATUS.created) {
        setDialog(
          <AlertDialog
            message={response.message || "Data successfully uploaded."}
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
    },
    [isLoading, isError, errMsg]
  );

  const itemNameRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const remainingCountRef = useRef<HTMLInputElement | null>(null);
  const categoriesRef = useRef<HTMLInputElement | null>(null);
  const itemDescOneRef = useRef<HTMLTextAreaElement | null>(null);
  const itemDescTwoRef = useRef<HTMLTextAreaElement | null>(null);
  const fileOneRef = useRef<HTMLInputElement | null>(null);
  const fileTwoRef = useRef<HTMLInputElement | null>(null);
  const fileThreeRef = useRef<HTMLInputElement | null>(null);

  function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const itemNameData = itemNameRef.current?.value || "";
    const priceData = Number(amountRef.current?.value) || 0;
    const itemDescription1Data = itemDescOneRef.current?.value || "";
    const itemDescription2Data = itemDescTwoRef.current?.value || "";
    const remainingCountData = Number(remainingCountRef.current?.value) || 0;
    const categoriesData = categoriesRef.current?.value || "";
    const file1Data = fileOneRef.current?.files!![0] || null;
    const file2Data = fileTwoRef.current?.files!![0] || null;
    const file3Data = fileThreeRef.current?.files!![0] || null;

    // validation
    if (
      !itemNameData ||
      priceData < 1 ||
      !itemDescription1Data ||
      remainingCountData < 1 ||
      !categoriesData ||
      !file1Data ||
      !file2Data ||
      !file3Data
    ) {
      setDialog(
        <AlertDialog
          message="Invalid data provided."
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

    const formData = new FormData();
    formData.append("itemName", itemNameData);
    formData.append("price", String(priceData));
    formData.append("itemDescription1", itemDescription1Data);
    formData.append("itemDescription2", itemDescription2Data);
    formData.append("remainingCount", String(remainingCountData));
    formData.append("categories", categoriesData);
    formData.append("files", file1Data!!);
    formData.append("files", file2Data!!);
    formData.append("files", file3Data!!);

    sendRequest(
      `${API_URL}/item/item`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
        notJSONBody: formData,
      },
      false
    );
  }

  return (
    <>
      {dialog}
      <form onSubmit={formSubmitHandler} className={styles.upload}>
        <Input inputRef={itemNameRef} text="Item Name" inputType="text" />
        <Input inputRef={amountRef} text="Amount" inputType="number" />
        <Input
          inputRef={remainingCountRef}
          text="Number of Items in store"
          inputType="number"
        />
        <Input
          inputRef={categoriesRef}
          text="Comma seperated list of categories"
          inputType="text"
        />
        <textarea
          className={styles["upload__big-text"]}
          placeholder="Item description 1"
          ref={itemDescOneRef}
        ></textarea>
        <textarea
          className={styles["upload__big-text"]}
          placeholder="Item description 2"
          ref={itemDescTwoRef}
        ></textarea>

        <div className={styles["upload__images"]}>
          <input ref={fileOneRef} accept="image/*" type="file" />
          <input ref={fileTwoRef} accept="image/*" type="file" />
          <input ref={fileThreeRef} accept="image/*" type="file" />
        </div>

        <Button
          text="Submit"
          isActive={!isLoading}
          type="submit"
          buttonType="main"
        />
      </form>
    </>
  );
}
