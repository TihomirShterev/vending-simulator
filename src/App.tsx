import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import PaymentSystem from "./components/PaymentSystem/PaymentSystem";
import InventoryManager from "./components/InventoryManager/InventoryManager";
import { formatMoney } from "./utils/helpers";
import { fetchProducts } from "./services/api";
import { IProduct } from "./types/types";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const insertCoin = (coin: number) => {
    setBalance((prev) => prev + coin);
    setMessage(`Inserted ${formatMoney(coin)}.`);
  };

  const returnCoins = () => {
    setBalance(0);
    setMessage(`Returned: ${formatMoney(balance)}.`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <InventoryManager products={products} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <PaymentSystem
            balance={balance}
            onInsertCoin={insertCoin}
            message={message}
            onReturnCoins={returnCoins}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
