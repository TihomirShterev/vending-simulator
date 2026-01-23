import { useCallback, useState } from "react";
import { IProduct } from "../types/types";
import { formatMoney } from "../utils/helpers";

export const usePayment = () => {
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");

  const insertCoin = useCallback((coin: number) => {
    setBalance((prev) => prev + coin);
    setMessage(`Inserted ${formatMoney(coin)}.`);
  }, []);

  const returnCoins = () => {
    setBalance(0);
    setMessage(`Returned: ${formatMoney(balance)}.`);
  };

  const buy = ({ id, name, price }: IProduct, decQty: (id: number) => void) => {
    if (balance < price) {
      setMessage("Insufficient funds!");
    } else {
      decQty(id);
      const change = balance - price;
      setBalance(0);

      setMessage(
        `Purchased "${name}".${
          change ? ` Change: ${formatMoney(change)}.` : ""
        }`
      );
    }
  };
  return { balance, message, insertCoin, returnCoins, buy };
};
