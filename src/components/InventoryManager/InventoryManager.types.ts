import { IProduct } from "../../types/types";

export interface InventoryManagerProps {
  products: IProduct[];
  onBuy: (product: Omit<IProduct, "quantity">) => void;
}
