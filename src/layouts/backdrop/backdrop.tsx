import { RootState } from "@/store/store";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import styles from "./backdrop.module.scss";

interface IPops {
  onBackdropClick: () => void;
}

export const removeBDStyleFromBD = () => {
  const backdropParentEl = document.getElementById("backdrop")!!;
  backdropParentEl.classList.remove("backdrop");
};

export default function Backdrop({ onBackdropClick }: IPops) {
  const showBackdrop = useSelector(
    (state: RootState) => state.backdrop.showBackdrop
  );

  console.log(showBackdrop);

  useEffect(
    function () {
      if (showBackdrop) {
        const backdropParentEl = document.getElementById("backdrop")!!;
        backdropParentEl.classList.add("backdrop");
      }
    },
    [showBackdrop]
  );

  return !showBackdrop ? (
    <></>
  ) : (
    createPortal(
      <div className={styles.backdrop} onClick={onBackdropClick}></div>,
      document.getElementById("backdrop")!!
    )
  );
}
