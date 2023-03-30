import styles from "./x-button.module.scss";

interface IProps {
  onXButtonClick?: () => void;
  extraClasses?: string;
}

export default function XButton({ onXButtonClick, extraClasses }: IProps) {
  return (
    <div
      onClick={onXButtonClick}
      className={`${styles.x} ${extraClasses}`}
    ></div>
  );
}
