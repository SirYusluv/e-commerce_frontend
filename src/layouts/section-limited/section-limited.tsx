import useResponsive from "@/hooks/use-responsive";
import SecLayScaffold from "../sec-lay-scaffold/sec-lay-scaffold";
import variables from "@/styles/variables.module.scss";
import styles from "./section-limited.module.scss";
import Image, { StaticImageData } from "next/image";
import ItemCurvedCtn from "@/components/item-curved-ctn/item-curved-ctn";
import { API_URL } from "@/util/data";

export interface ILimitedItem {
  image: StaticImageData | string;
  remainingCount: number;
}

interface IProp {
  limitedItems: ILimitedItem[];
}

export default function SectionLimited({ limitedItems }: IProp) {
  const isTablet = useResponsive(`(max-width: ${variables.widthTablet})`);
  const isMobile = useResponsive(`(max-width: ${variables.widthMobile})`);

  let content: JSX.Element | JSX.Element[] | null = null;

  // for tablet
  if (isTablet && !isMobile) {
    content = (
      <>
        <ItemCurvedCtn extraClasses={styles.item}>
          <p className={styles["item__limit"]}>
            {limitedItems[0].remainingCount} left
          </p>
          <div className={styles["item__image-ctn"]}>
            <Image
              alt="Shoe"
              src={`${API_URL}/${limitedItems[0].image}`}
              sizes={`(max-width: ${variables.widthMobile}) 185px,
          218px`}
              fill
            />
          </div>
        </ItemCurvedCtn>

        <div className={styles["item__items--tablet"]}>
          <ItemCurvedCtn extraClasses={styles.item}>
            <p className={styles["item__limit"]}>
              {limitedItems[1].remainingCount} left
            </p>
            <div className={styles["item__image-ctn"]}>
              <Image
                alt="Shoe"
                src={`${API_URL}/${limitedItems[1].image}`}
                sizes={`(max-width: ${variables.widthMobile}) 185px,
          218px`}
                fill
              />
            </div>
          </ItemCurvedCtn>

          <ItemCurvedCtn extraClasses={styles.item}>
            <p className={styles["item__limit"]}>
              {limitedItems[2].remainingCount} left
            </p>
            <div className={styles["item__image-ctn"]}>
              <Image
                alt="Shoe"
                src={`${API_URL}/${limitedItems[2].image}`}
                sizes={`(max-width: ${variables.widthMobile}) 185px,
          218px`}
                fill
              />
            </div>
          </ItemCurvedCtn>
        </div>
      </>
    );
  }

  // mobile and desktop
  if (!content) {
    content = limitedItems.map((item, i) => (
      <ItemCurvedCtn key={i} extraClasses={styles.item}>
        <p className={styles["item__limit"]}>{item.remainingCount} left</p>
        <div className={styles["item__image-ctn"]}>
          <Image
            className={styles["item__image"]}
            alt="Shoe"
            src={`${API_URL}/${item.image}`}
            sizes={`(max-width: ${variables.widthMobile}) 185px,
        218px`}
            fill
          />
        </div>
      </ItemCurvedCtn>
    ));
  }

  return (
    <SecLayScaffold
      sectionTitleMain="Limited"
      sectionTitle="Items"
      sectionSub="Get them before they are gone!"
      extraClasses={styles.limited}
    >
      <div className={styles["item__items"]}>{content}</div>
    </SecLayScaffold>
  );
}
