import { RootState } from "@/store/store";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import styles from "./backdrop.module.scss";

interface IPops {
  onBackdropClick: () => void;
}

export default function Backdrop({ onBackdropClick }: IPops) {
  const showBackdrop = useSelector(
    (state: RootState) => state.backdrop.showBackdrop
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
