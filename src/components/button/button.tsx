import { LegacyRef } from "react";
import styles from "./button.module.scss";

interface IProps {
  type: "main" | "secondary";
  text: string;
  ref?: LegacyRef<HTMLButtonElement>;
  extraClasses?: string;
  isActive?: boolean;
  buttonClickHandler?: () => void;
}

export default function Button({
  type,
  text,
  extraClasses,
  ref,
  isActive = true,
  buttonClickHandler,
}: IProps) {
  switch (type) {
    case "main":
      return (
        <button
          onClick={buttonClickHandler}
          className={`${styles.button} ${styles["button__main"]} ${
            isActive ? "" : styles["button__main--not-active"]
          } ${extraClasses}`}
          ref={ref}
        >
          {" "}
          {text}
        </button>
      );
    case "secondary":
      return (
        <button
          onClick={buttonClickHandler}
          className={`${styles.button} ${styles["button__secondary"]} ${extraClasses}`}
          ref={ref}
        >
          {" "}
          {text}
        </button>
      );
    default:
      return <></>;
  }
}
