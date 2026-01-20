import { IProduct } from "../../types/types";

export interface InventoryManagerProps {
  products: IProduct[];
  onBuy: (product: IProduct) => void;
  onAdd: () => void;
}
