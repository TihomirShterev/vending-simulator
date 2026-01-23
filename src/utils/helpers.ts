const CURRENCY = "EUR"; // €
const LOCALE = "de-DE"; // Germany

export const formatMoney = (amount: number) =>
  new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
  }).format(amount);
