import useRequest from "@/hooks/use-http";
import useResponsive from "@/hooks/use-responsive";
import { ACCESS_TOKEN, API_URL, HTTP_STATUS } from "@/util/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IItemFromDb } from "../item/item";
import removeIcon from "@/assets/delete.png";
import reduceIcon from "@/assets/reduce.png";
import addIcon from "@/assets/add.png";
import variables from "@/styles/variables.module.scss";
import Button from "../button/button";
import styles from "./cart-item.module.scss";

interface IProp {
  id: string;
  quantity: number;
  removeBtnOnClick: () => void;
  editQtyBtnOnClick: (type: "add" | "reduce") => void;
}

export default function CartItem({ id, quantity }: IProp) {
  const [item, setItem] = useState<IItemFromDb | null>(null);
  const isTablet = useResponsive(`(max-width: ${variables.widthTablet})`);
  const isMobile = useResponsive(`(max-width: ${variables.widthMobile})`);
  const [sendRequest, _, isLoading, isError, errMsg, response] = useRequest();

  useEffect(
    function () {
      if (!id) return;

      sendRequest(`${API_URL}/item/items`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
        body: {
          itemId: String(id) || "",
        },
      });
    },
    [id]
  );

  useEffect(
    function () {
      if (isLoading || isError || errMsg) return;

      if (response.status === HTTP_STATUS.ok) {
        const items: IItemFromDb = ((response.items || []) as IItemFromDb[])[0];
        items && setItem(items);
        return;
      }
    },
    [isLoading, errMsg, isError]
  );

  return !item ? (
    <></>
  ) : (
    <div className={styles["cart-item"]}>
      <div className={styles["cart-item__image--ctn"]}>
        <Image
          className={styles["cart-item__image"]}
          alt="item"
          src={`${API_URL}/${item.images[0]}`}
          fill
        />
      </div>

      <div className={styles["cart-item__detail"]}>
        <div className={styles["cart-item__detail--1"]}>
          <p className={styles["cart-item__title"]}>{item.itemName}</p>
          <p className={styles["cart-item__price"]}>&#x20A6;{item.price}</p>
        </div>

        {!isTablet && (
          <p className={styles["cart-item__quantity"]}>x{quantity}</p>
        )}

        <div className={styles["cart-item__detail--2"]}>
          <Button
            extraClasses={styles["cart-item__btn--remove"]}
            text={isMobile ? "" : "Remove"}
            image={removeIcon}
            buttonType="image-with-btn-sec"
          />

          <div className={styles["cart-item__btns--edit-qty"]}>
            <Button
              extraClasses={styles["cart-item__btn--reduce"]}
              imgExtraClasses={styles["cart-item__btn--reduce-img"]}
              text=""
              image={reduceIcon}
              buttonType="image-with-btn-sec"
            />
            <p className={styles["cart-item__btn--quantity"]}>{quantity}</p>
            <Button
              extraClasses={styles["cart-item__btn--add"]}
              text=""
              image={addIcon}
              buttonType="image-with-btn-sec"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
