import useResponsive from "@/hooks/use-responsive";
import SecLayScaffold from "../sec-lay-scaffold/sec-lay-scaffold";
import variables from "@/styles/variables.module.scss";
import bag from "@/assets/bg-bag.png";
import nike from "@/assets/bg-nike.png";
import styles from "./section-limited.module.scss";
import Image, { StaticImageData } from "next/image";
import ItemCurvedCtn from "@/components/item-curved-ctn/item-curved-ctn";

interface IItem {
  image: StaticImageData;
  remainingCount: number;
}

const items: [IItem, IItem, IItem] = [
  {
    image: nike,
    remainingCount: 4,
  },
  {
    image: bag,
    remainingCount: 2,
  },
  {
    image: nike,
    remainingCount: 1,
  },
];

export default function SectionLimited() {
  const isTablet = useResponsive(`(max-width: ${variables.widthTablet})`);
  const isMobile = useResponsive(`(max-width: ${variables.widthMobile})`);

  let content: JSX.Element | JSX.Element[] | null = null;

  // for tablet
  if (isTablet && !isMobile) {
    content = (
      <>
        <ItemCurvedCtn extraClasses={styles.item}>
          <p className={styles["item__limit"]}>
            {items[0].remainingCount} left
          </p>
          <div className={styles["item__image-ctn"]}>
            <Image
              alt="Shoe"
              src={items[0].image}
              sizes={`(max-width: ${variables.widthMobile}) 185px,
          218px`}
              fill
            />
          </div>
        </ItemCurvedCtn>

        <div className={styles["item__items--tablet"]}>
          <ItemCurvedCtn extraClasses={styles.item}>
            <p className={styles["item__limit"]}>
              {items[1].remainingCount} left
            </p>
            <div className={styles["item__image-ctn"]}>
              <Image
                alt="Shoe"
                src={items[1].image}
                sizes={`(max-width: ${variables.widthMobile}) 185px,
          218px`}
                fill
              />
            </div>
          </ItemCurvedCtn>

          <ItemCurvedCtn extraClasses={styles.item}>
            <p className={styles["item__limit"]}>
              {items[2].remainingCount} left
            </p>
            <div className={styles["item__image-ctn"]}>
              <Image
                alt="Shoe"
                src={items[2].image}
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
    content = items.map((item, i) => (
      <ItemCurvedCtn key={i} extraClasses={styles.item}>
        <p className={styles["item__limit"]}>{item.remainingCount} left</p>
        <div className={styles["item__image-ctn"]}>
          <Image
            alt="Shoe"
            src={item.image}
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
