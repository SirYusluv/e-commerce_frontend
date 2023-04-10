import search from "@/assets/search.png";
import chevronRight from "@/assets/chevron-right.png";
import Image from "next/image";
import styles from "./search.module.scss";
import { FormEvent } from "react";

interface IProps {
  extraClasses?: string;
  onSearchClick?: () => void;
  text?: string;
  formSubmitHandler?: (e: FormEvent<HTMLFormElement>) => void;
}

export default function Search({
  extraClasses,
  onSearchClick,
  text,
  formSubmitHandler,
}: IProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formSubmitHandler && formSubmitHandler(e);
      }}
      onClick={onSearchClick}
      className={`${styles["search"]} ${extraClasses}`}
    >
      <Image alt="search" src={search} />

      <input
        placeholder={text || "Search"}
        className={styles["search__input"]}
      />
      <button type="submit" className={styles["search__btn"]}>
        <Image alt="right arrow" src={chevronRight} />
      </button>
    </form>
  );
}
