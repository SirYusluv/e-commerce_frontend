import Image from "next/image";
import { useState } from "react";
import styles from "./image-ctn.module.scss";

interface IProp {
  image1: string;
  image2: string;
  image3: string;
}

export default function ImageCtn({ image1, image2, image3 }: IProp) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className={styles["images"]}>
      <div className={styles["images__main--ctn"]}>
        <Image
          className={styles["images__main"]}
          alt="item"
          src={
            activeImageIndex === 0
              ? image1
              : activeImageIndex === 1
              ? image2
              : image3
          }
          fill
        />
      </div>

      <div className={`${styles["images__sub--main-ctn"]} link`}>
        <div
          className={`${styles["images__sub--ctn"]} ${
            activeImageIndex === 0 ? styles["images__sub--ctn-active"] : ""
          }`}
          onClick={() => {
            setActiveImageIndex(0);
          }}
        >
          <Image
            className={styles["images__sub"]}
            alt="item"
            src={image1}
            fill
          />
        </div>

        <div
          className={`${styles["images__sub--ctn"]} ${
            activeImageIndex === 1 ? styles["images__sub--ctn-active"] : ""
          }`}
          onClick={() => {
            setActiveImageIndex(1);
          }}
        >
          <Image
            className={styles["images__sub"]}
            alt="item"
            src={image2}
            fill
          />
        </div>

        <div
          className={`${styles["images__sub--ctn"]} ${
            activeImageIndex === 2 ? styles["images__sub--ctn-active"] : ""
          }`}
          onClick={() => {
            setActiveImageIndex(2);
          }}
        >
          <Image
            className={styles["images__sub"]}
            alt="item"
            src={image3}
            fill
          />
        </div>
      </div>
    </div>
  );
}
