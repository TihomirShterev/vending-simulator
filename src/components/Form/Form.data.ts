import { Field } from "./Form.types";
import { MIN_COIN } from "../../utils/constants";

const MIN_PRODUCTS = 1;
const MAX_PRODUCTS = 15;
const DECIMAL_PLACES_PATTERN = /^\d+(\.\d{1,2})?$/; // Max 2 decimal places

export const FORM_DATA: Field[] = [
  {
    name: "name",
    label: "Product Name",
  },
  {
    name: "price",
    label: "Price (€)",
    validate: (value) =>
      (DECIMAL_PLACES_PATTERN.test(value.toString()) && MIN_COIN <= value) ||
      "Please enter a positive number. Maximum two decimal places allowed.",
  },
  {
    name: "quantity",
    label: `Initial Stock (max ${MAX_PRODUCTS} items)`,
    validate: (value) =>
      (Number.isInteger(value) &&
        MIN_PRODUCTS <= value &&
        value <= MAX_PRODUCTS) ||
      `Please enter an integer between ${MIN_PRODUCTS} and ${MAX_PRODUCTS}.`,
  },
];
