import { useState } from "react";
import { Container, Grid } from "@mui/material";
import PaymentSystem from "./components/PaymentSystem/PaymentSystem";
import { formatMoney } from "./utils/helpers";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");

  const insertCoin = (coin: number) => {
    setBalance((prev) => prev + coin);
    setMessage(`Inserted ${formatMoney(coin)}.`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <PaymentSystem
        balance={balance}
        onInsertCoin={insertCoin}
        message={message}
      />
    </Container>
  );
};

export default App;
