import { IProduct } from "../types/types";
import { MOCK_PRODUCTS } from "./api.data";

export const fetchProducts = (): Promise<IProduct[]> =>
  new Promise((resolve) => setTimeout(() => resolve(MOCK_PRODUCTS), 500));
