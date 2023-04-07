import { ButtonHTMLAttributes, DetailedHTMLProps, LegacyRef } from "react";
import styles from "./button.module.scss";

interface IProps {
  type?: "button" | "submit" | "reset" | undefined;
  buttonType: "main" | "secondary" | "outlined";
  text: string;
  ref?: LegacyRef<HTMLButtonElement>;
  extraClasses?: string;
  isActive?: boolean;
  buttonClickHandler?: () => void;
}

export default function Button({
  type,
  buttonType,
  text,
  extraClasses,
  ref,
  isActive = true,
  buttonClickHandler,
}: IProps) {
  switch (buttonType) {
    case "main":
      return (
        <button
          onClick={buttonClickHandler}
          className={`${styles.button} ${styles["button__main"]} ${
            isActive ? "" : styles["button__main--not-active"]
          } ${extraClasses}`}
          ref={ref}
          type={type || "button"}
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
          type={type || "button"}
        >
          {" "}
          {text}
        </button>
      );
    case "outlined":
      return (
        <button
          onClick={buttonClickHandler}
          className={`${styles.button} ${styles["button__outlined"]} ${extraClasses}`}
          ref={ref}
          type={type || "button"}
        >
          {" "}
          {text}
        </button>
      );
    default:
      return <></>;
  }
}
