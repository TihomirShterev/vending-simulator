import { IProduct } from "../../types/types";

export interface FormProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: IProduct) => void;
}

export interface Field {
  name: "name" | "price" | "quantity";
  label: string;
  validate?: (value: number | string) => boolean | string;
}
