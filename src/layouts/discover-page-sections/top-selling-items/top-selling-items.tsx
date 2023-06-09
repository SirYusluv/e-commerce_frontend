import ItemAndTitlePack from "@/components/item-and-title-pack/item-and-title-pack";
import { IItem } from "@/components/item/item";

interface IProp {
  items: IItem[];
}

export default function TopSellingItems({ items }: IProp) {
  return <ItemAndTitlePack items={items} title="Top selling items" />;
}
