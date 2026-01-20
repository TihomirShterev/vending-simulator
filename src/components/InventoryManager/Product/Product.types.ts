import { IProduct } from "../../../types/types";

export interface ProductProps {
  data: IProduct;
  onBuy: (product: IProduct) => void;
  onEdit: (product: IProduct) => void;
  onRemove: (id: number) => void;
}
