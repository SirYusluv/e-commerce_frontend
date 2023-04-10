import Image, { StaticImageData } from "next/image";
import variables from "@/styles/variables.module.scss";
import styles from "./icon-and-text.module.scss";

interface IProp {
  icon: StaticImageData;
  text: string;
  clickHandler?: () => void;
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
      onClick={clickHandler}
      className={`${styles["icon-and-text"]} ${extraClasses}`}
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
