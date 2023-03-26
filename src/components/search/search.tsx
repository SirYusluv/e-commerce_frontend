import search from "@/assets/search.png";
import chevronRight from "@/assets/chevron-right.png";
import Image from "next/image";
import styles from "./search.module.scss";

interface IProps {
  extraClasses?: string;
  onSearchClick?: () => void;
}

export default function Search({ extraClasses, onSearchClick }: IProps) {
  return (
    <div
      onClick={onSearchClick}
      className={`${styles["search"]} ${extraClasses}`}
    >
      <Image alt="search" src={search} />
      {/* <p className={styles["search__text"]}>Search</p> */}
      <input placeholder="Search" className={styles["search__input"]} />
      <Image alt="right arrow" src={chevronRight} />
    </div>
  );
}
