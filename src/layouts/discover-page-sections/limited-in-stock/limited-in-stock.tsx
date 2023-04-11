import ItemAndTitlePack from "@/components/item-and-title-pack/item-and-title-pack";
import { IItem } from "@/components/item/item";

interface IProp {
  items: IItem[];
}

export default function LimitedInStock({ items }: IProp) {
  return <ItemAndTitlePack items={items} title="Limited in stock" />;
}
