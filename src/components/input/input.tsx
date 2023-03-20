import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  LegacyRef,
} from "react";
import styles from "./input.module.scss";

interface IProps {
  text: string;
  inputType: HTMLInputTypeAttribute;
  inputRef: LegacyRef<HTMLInputElement>;
  extraClasses?: string;
}

export default function Input({
  text,
  inputType,
  inputRef,
  extraClasses,
}: IProps) {
  return (
    <input
      className={`${styles["input-box"]} ${extraClasses}`}
      placeholder={text}
      type={inputType}
      ref={inputRef}
    />
  );
}
