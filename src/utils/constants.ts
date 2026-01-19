import { IProduct } from "../types/types";

export const CURRENCY = "EUR"; // €
export const LOCALE = "de-DE"; // Germany

export const MOCK_PRODUCTS: IProduct[] = [
  { id: 1, name: "Juice", price: 1.5, quantity: 10 },
  { id: 2, name: "Water", price: 1.0, quantity: 15 },
  { id: 3, name: "Soda", price: 1.2, quantity: 5 },
  { id: 4, name: "Milk", price: 1.35, quantity: 2 },
];
