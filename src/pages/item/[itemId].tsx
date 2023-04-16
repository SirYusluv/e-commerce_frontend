import { IItemFromDb } from "@/components/item/item";
import useRequest from "@/hooks/use-http";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import ItemDetailNav from "@/layouts/nav/item-detail-nav/item-detail-nav";
import { hideBackdrop } from "@/store/slices/backdrop-slice";
import { ACCESS_TOKEN, API_URL, HTTP_STATUS } from "@/util/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ItemPage() {
  const [item, setItem] = useState<IItemFromDb | null>(null);
  const [dialog, setDialog] = useState<JSX.Element | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [sendRequest, _, isLoading, isError, errMsg, response] = useRequest();

  useEffect(() => {
    const itemId = window.location.pathname.split("/")[2];
    sendRequest(`${API_URL}/item/items`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
      body: {
        itemId: String(itemId) || "",
      },
    });
  }, []);

  useEffect(
    function () {
      if (isLoading) return;

      if (isError || errMsg) {
        setDialog(
          <AlertDialog
            message={errMsg || "Error occurred."}
            buttonPri="Ok"
            backdropClickHandler={() => {
              setDialog(null);
              dispatch(hideBackdrop());
            }}
            onButtonPriClick={() => {
              setDialog(null);
              dispatch(hideBackdrop());
            }}
          />
        );
        return;
      }

      if (response.status === HTTP_STATUS.ok) {
        const items: IItemFromDb = (response.items as IItemFromDb[])[0];
        setItem(items);
        return;
      }

      response.message &&
        setDialog(
          <AlertDialog
            message={response.message}
            buttonPri="Ok"
            backdropClickHandler={() => {
              setDialog(null);
              dispatch(hideBackdrop());
            }}
            onButtonPriClick={() => {
              setDialog(null);
              dispatch(hideBackdrop());
            }}
          />
        );
    },
    [isLoading, errMsg, isError]
  );

  return (
    <>
      <ItemDetailNav title="Product detail" />
      {dialog}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !item && <p>Item not found.</p>}
    </>
  );
}

// INFO: was going to use this but unfofrtunatrly i can't access bearer token from server
// export const getServerSideProps: GetServerSideProps<{
//   item: IItemFromDb;
// }> = async (context) => {
//   const itemId = context.params?.itemId;

//   let item: IItemFromDb[] | null = null;
//   const itemResponse = await fetch(`${API_URL}/item/items`, {});

//   if (limitedResponse.ok) {
// let items = (await limitedResponse.json()).items as any[];
// expected to fetch 3 items from db
// if (items.length === 3) {
//   limited = items.map(({ images, remainingCount }) => ({
//     image: images[0],
//     remainingCount,
//   }));
// }
//   } else {
// limited = dummyLimited;
//   }

//   return {
//     props: { item: {} as IItemFromDb },
//   };
// };
