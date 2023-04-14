import Button from "@/components/button/button";
import { showBackdrop } from "@/store/slices/backdrop-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Backdrop, { removeBDStyleFromBD } from "../backdrop/backdrop";
import Modal from "../modal/modal";
import styles from "./alert-dialog.module.scss";

type IProps = {
  title?: string;
  message: string;
  buttonPri?: string;
  buttonSec?: string;
  onButtonPriClick?: () => void;
  onButtonSecClick?: () => void;
  backdropClickHandler: () => void;
};

function AlertDialog({
  title,
  message,
  buttonPri,
  buttonSec,
  onButtonPriClick,
  onButtonSecClick,
  backdropClickHandler,
}: IProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showBackdrop());
  }, []);

  return (
    <Modal>
      <Backdrop
        onBackdropClick={() => {
          removeBDStyleFromBD();
          backdropClickHandler();
        }}
      />
      <div className={styles["alert"]}>
        {title && <p className="card-title">{title}</p>}
        <p className="card-detail">{message}</p>
        <div className={styles["alert__action"]}>
          {buttonSec && (
            <Button
              buttonType="secondary"
              text={buttonSec}
              buttonClickHandler={() => {
                removeBDStyleFromBD();
                onButtonSecClick && onButtonSecClick();
              }}
            />
          )}
          {buttonPri && (
            <Button
              buttonType="main"
              text={buttonPri}
              buttonClickHandler={() => {
                removeBDStyleFromBD();
                onButtonPriClick && onButtonPriClick();
              }}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

export default AlertDialog;
