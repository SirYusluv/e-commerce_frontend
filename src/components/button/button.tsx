import { LegacyRef } from "react";
import styles from "./button.module.scss";

interface IProps {
  type: "main";
  text: string;
  ref?: LegacyRef<HTMLButtonElement>;
  extraClasses?: string;
}

export default function Button({ type, text, extraClasses, ref }: IProps) {
  switch (type) {
    case "main":
      return (
        <button
          className={`${styles.button} ${styles["button__main"]} ${extraClasses}`}
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
