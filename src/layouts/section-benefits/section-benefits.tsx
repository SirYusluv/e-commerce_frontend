import ItemCurvedCtn from "@/components/item-curved-ctn/item-curved-ctn";
import SecLayScaffold from "../sec-lay-scaffold/sec-lay-scaffold";
import cart from "@/assets/shopping.png";
import quality from "@/assets/guarantee.png";
import variety from "@/assets/variety.png";
import variables from "@/styles/variables.module.scss";
import styles from "./section-benefits.module.scss";
import Image from "next/image";
import useResponsive from "@/hooks/use-responsive";

const contents = [
  {
    title: "Ease of shopping",
    detail:
      "Experience the ease and convenience of shopping online with our user-friendly platform.",
    image: cart,
  },
  {
    title: "Best Quality",
    detail: "Shop here and be assured of getting the best quality products.",
    image: quality,
  },
  {
    title: "Variety of products",
    detail:
      "Explore a vast selection of products and find exactly what you need.",
    image: variety,
  },
];

export default function SectionBenefits() {
  const isTablet = useResponsive(`(max-width: ${variables.widthTablet})`);
  const isMobile = useResponsive(`(max-width: ${variables.widthMobile})`);

  let content: JSX.Element | JSX.Element[] | null = null;

  // for tablet
  if (isTablet && !isMobile) {
    content = (
      <>
        <ItemCurvedCtn
          extraClasses={`${styles["services__item"]} ${
            styles[`services__item--1`]
          }`}
        >
          <div className={styles["services__item-image--ctn"]}>
            <Image
              alt={contents[0].title}
              src={contents[0].image}
              className={styles["services__item-image--image"]}
              sizes="53px"
              fill
            />
          </div>

          <h4 className={styles["services__item-title"]}>
            {contents[0].title}
          </h4>

          <p className={styles["services__item-detail"]}>
            {contents[0].detail}
          </p>
        </ItemCurvedCtn>

        <div className={`${styles["services__items--tablet"]}`}>
          <ItemCurvedCtn
            extraClasses={`${styles["services__item"]} ${
              styles[`services__item--2`]
            }`}
          >
            <div className={styles["services__item-image--ctn"]}>
              <Image
                alt={contents[1].title}
                src={contents[1].image}
                className={styles["services__item-image--image"]}
                sizes="53px"
                fill
              />
            </div>

            <h4 className={styles["services__item-title"]}>
              {contents[1].title}
            </h4>

            <p className={styles["services__item-detail"]}>
              {contents[1].detail}
            </p>
          </ItemCurvedCtn>

          <ItemCurvedCtn
            extraClasses={`${styles["services__item"]} ${
              styles[`services__item--3`]
            }`}
          >
            <div className={styles["services__item-image--ctn"]}>
              <Image
                alt={contents[2].title}
                src={contents[2].image}
                className={styles["services__item-image--image"]}
                sizes="53px"
                fill
              />
            </div>

            <h4 className={styles["services__item-title"]}>
              {contents[2].title}
            </h4>

            <p className={styles["services__item-detail"]}>
              {contents[2].detail}
            </p>
          </ItemCurvedCtn>
        </div>
      </>
    );
  }

  // mobile and desktop
  if (!content) {
    content = contents.map((cont, i) => (
      <ItemCurvedCtn
        key={i}
        extraClasses={`${styles["services__item"]} ${
          styles[`services__item--${i + 1}`]
        }`}
      >
        <div className={styles["services__item-image--ctn"]}>
          <Image
            alt={cont.title}
            src={cont.image}
            className={styles["services__item-image--image"]}
            sizes="53px"
            fill
          />
        </div>

        <h4 className={styles["services__item-title"]}>{cont.title}</h4>

        <p className={styles["services__item-detail"]}>{cont.detail}</p>
      </ItemCurvedCtn>
    ));
  }

  return (
    <SecLayScaffold
      extraClasses={styles.services}
      sectionTitleMain="Benefits"
      sectionTitle="of using our services"
      sectionSub="Unlock a world of benefits when you shop with us"
    >
      <div className={styles["services__items"]}>{content}</div>
    </SecLayScaffold>
  );
}
