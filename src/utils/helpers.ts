import { LOCALE, CURRENCY } from "./constants";

export const formatMoney = (amount: number) =>
  new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
  }).format(amount);
