import { IProduct } from "../../../types/types";

export interface ProductProps {
  data: IProduct;
  onBuy: (product: Omit<IProduct, "quantity">) => void;
}
