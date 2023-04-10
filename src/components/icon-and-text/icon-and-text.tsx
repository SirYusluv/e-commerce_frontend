import Image, { StaticImageData } from "next/image";
import variables from "@/styles/variables.module.scss";
import styles from "./icon-and-text.module.scss";

interface IProp {
  icon: StaticImageData;
  text: string;
  clickHandler?: (text?: string) => void;
  extraClasses?: string;
  iconExtraClasses?: string;
  textExtraClasses?: string;
}

export default function IconAndText({
  icon,
  text,
  clickHandler,
  extraClasses,
  iconExtraClasses,
  textExtraClasses,
}: IProp) {
  return (
    <div
      onClick={() => {
        clickHandler && clickHandler(text);
      }}
      className={`${styles["icon-and-text"]} link ${extraClasses}`}
    >
      <Image
        alt="Icon"
        src={icon}
        width="40"
        sizes={`(max-width: ${variables.widthTablet}) 30px, 40px`}
        className={`${styles["icon-and-text__icon"]} ${iconExtraClasses}`}
      />
      <p className={`${styles["icon-and-text__text"]} ${textExtraClasses}`}>
        {text}
      </p>
    </div>
  );
}
