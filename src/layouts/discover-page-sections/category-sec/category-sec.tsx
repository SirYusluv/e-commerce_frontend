import Categories from "./categories/categories";
import Items from "./items/items";
import supermarket from "@/assets/category-icons/supermarket.png";
import men from "@/assets/category-icons/men.png";
import women from "@/assets/category-icons/women.png";
import sport from "@/assets/category-icons/sport.png";
import computing from "@/assets/category-icons/computing.png";
import health from "@/assets/category-icons/health.png";
import gaming from "@/assets/category-icons/gaming.png";
import babyproduct from "@/assets/category-icons/babyproduct.png";
import phone from "@/assets/category-icons/phone.png";
import clothe from "@/assets/category-icons/supermarket.png";
import casualSweater from "@/assets/items images/casual sweater.png";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { IItem, IItemFromDb } from "@/components/item/item";
import styles from "./category-sec.module.scss";
import useRequest, { IOption } from "@/hooks/use-http";
import { useDispatch } from "react-redux";
import { ACCESS_TOKEN, API_URL, HTTP_STATUS } from "@/util/data";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import { hideBackdrop } from "@/store/slices/backdrop-slice";
import { useRouter } from "next/router";

export interface ICategory {
  icon: StaticImageData;
  text: string;
}

const categories: ICategory[] = [
  {
    icon: supermarket,
    text: "Supermarket",
  },
  {
    icon: men,
    text: "Men",
  },
  {
    icon: women,
    text: "Women",
  },
  {
    icon: sport,
    text: "Sport",
  },
  {
    icon: computing,
    text: "Computing",
  },
  {
    icon: health,
    text: "Health",
  },
  {
    icon: gaming,
    text: "Gaming",
  },
  {
    icon: babyproduct,
    text: "Baby Products",
  },
  {
    icon: phone,
    text: "Phones",
  },
  {
    icon: clothe,
    text: "Clothing",
  },
];

const itemsList: IItem[] = [
  {
    id: "0",
    name: "Casual sweater",
    image: casualSweater,
    price: 773,
    remainingCount: 3,
    stars: 3,
    reviewCount: 3,
  },
  {
    id: "1",
    name: "Casual sweater",
    image: casualSweater,
    price: 773,
    remainingCount: 3,
    stars: 3,
    reviewCount: 3,
  },
];

interface IProps {
  supermarketItems: IItem[];
}

export default function CategorySec({ supermarketItems }: IProps) {
  const [items, setItems] = useState<IItem[]>(supermarketItems);
  const [searchedCategory, setSearchedCategory] = useState<string>("");
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const [sendRequest, reset, isLoading, isError, errMsg, response] =
    useRequest();
  const [Modal, setModal] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    !token && router.replace("/auth/signin");
  }, []);

  useEffect(
    function () {
      if (isLoading) return;

      if (isError || errMsg)
        return setModal(
          <AlertDialog
            message={errMsg || "Error processing request."}
            buttonPri="Ok"
            onButtonPriClick={removeModalAndBackdrop}
            backdropClickHandler={removeModalAndBackdrop}
          />
        );

      // we need at least 2 items
      if (response.items?.length > 1) {
        const convertedItems: IItem[] = [];
        const fetchedItems: IItemFromDb[] = response.items;

        for (let i = 0; i < 2; i++) {
          const fetchedItem: IItem = {
            id: fetchedItems[i]._id,
            name: fetchedItems[i].itemName,
            image: `${API_URL}/${fetchedItems[i].images[0]}`,
            price: fetchedItems[i].price,
            remainingCount: fetchedItems[i].remainingCount,
            reviewCount: Math.floor(Math.random() * 100) + 1,
            stars: Math.floor(Math.random() * 4) + 2, // random number from 2 - 5
          };
          convertedItems.push(fetchedItem);
        }

        setActiveCategory();
        setItems(convertedItems);

        return;
      }

      setModal(
        <AlertDialog
          message={response.message || "Items not found."}
          buttonPri="Ok"
          onButtonPriClick={removeModalAndBackdrop}
          backdropClickHandler={removeModalAndBackdrop}
        />
      );
    },
    [isLoading, isError, errMsg, response.message]
  );

  function removeModalAndBackdrop() {
    setModal(null);
    dispatch(hideBackdrop());
  }

  function setActiveCategory() {
    setActiveCategoryIndex(
      categories.findIndex(({ text }) => text === searchedCategory)
    );
  }

  function categoryClickHandler(category: string) {
    setSearchedCategory(category);
    const options: IOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
      body: {
        category,
      },
    };
    sendRequest(`${API_URL}/item/items?limit=2`, options);
  }

  return (
    <>
      {Modal}
      <section className={styles["category-sec"]}>
        <Categories
          categories={categories}
          activeCategoryIndex={activeCategoryIndex}
          onCategoryClick={categoryClickHandler}
        />
        <Items items={items} itemsIsLoading={isLoading} />
      </section>
    </>
  );
}
