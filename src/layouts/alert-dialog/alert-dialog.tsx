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
            <p onClick={onButtonSecClick} className="button button-sec">
              {buttonSec}
            </p>
          )}
          {buttonPri && (
            <p onClick={onButtonPriClick} className="button button-pri">
              {buttonPri}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default AlertDialog;
