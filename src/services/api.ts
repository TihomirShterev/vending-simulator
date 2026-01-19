import { IProduct } from "../types/types";
import { MOCK_PRODUCTS } from "../utils/constants";

export const fetchProducts = (): Promise<IProduct[]> =>
  new Promise((resolve) => setTimeout(() => resolve(MOCK_PRODUCTS), 500));
