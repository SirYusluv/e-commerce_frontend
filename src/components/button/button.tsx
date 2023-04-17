import Image, { StaticImageData } from "next/image";
import { ButtonHTMLAttributes, DetailedHTMLProps, LegacyRef } from "react";
import variables from "@/styles/variables.module.scss";
import styles from "./button.module.scss";

interface IProps {
  type?: "button" | "submit" | "reset" | undefined;
  buttonType: "main" | "secondary" | "outlined" | "image-with-btn";
  text: string;
  ref?: LegacyRef<HTMLButtonElement>;
  btnImgRef?: LegacyRef<HTMLDivElement>; // for: "image-with-btn"
  extraClasses?: string;
  isActive?: boolean;
  image?: StaticImageData;
  buttonClickHandler?: () => void;
}

export default function Button({
  type,
  buttonType,
  text,
  extraClasses,
  ref,
  btnImgRef,
  image,
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
    case "image-with-btn":
      return (
        <div
          onClick={buttonClickHandler}
          className={`${styles.button} ${styles["button__image-with-btn"]} ${extraClasses} link`}
          ref={btnImgRef}
        >
          <Image
            className={styles["button__image-with-btn--image"]}
            alt="button"
            src={image ? image : ""}
            width="30"
            sizes={`(max-width: ${variables.widthMobile}) 20px, 30px`}
          />{" "}
          <p>{text}</p>
        </div>
      );
    default:
      return <></>;
  }
}
