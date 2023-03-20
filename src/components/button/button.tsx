import { LegacyRef } from "react";
import styles from "./button.module.scss";

interface IProps {
  type: "main";
  text: string;
  ref?: LegacyRef<HTMLButtonElement>;
  extraClasses?: string;
  isActive?: boolean;
}

export default function Button({
  type,
  text,
  extraClasses,
  ref,
  isActive = true,
}: IProps) {
  switch (type) {
    case "main":
      return (
        <button
          className={`${styles.button} ${styles["button__main"]} ${
            isActive ? "" : styles["button__main--not-active"]
          } ${extraClasses}`}
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
