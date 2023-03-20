import Button from "@/components/button/button";
import Backdrop from "../backdrop/backdrop";
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
  return (
    <Modal>
      <Backdrop onBackdropClick={backdropClickHandler} />
      <div className={styles["alert"]}>
        {title && <p className="card-title">{title}</p>}
        <p className="card-detail">{message}</p>
        <div className={styles["alert__action"]}>
          {buttonSec && (
            <Button
              type="secondary"
              text={buttonSec}
              buttonClickHandler={onButtonSecClick}
            />
          )}
          {buttonPri && (
            <Button
              type="main"
              text={buttonPri}
              buttonClickHandler={onButtonPriClick}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

export default AlertDialog;
