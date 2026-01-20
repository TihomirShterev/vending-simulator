import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import PaymentSystem from "./components/PaymentSystem/PaymentSystem";
import InventoryManager from "./components/InventoryManager/InventoryManager";
import { formatMoney } from "./utils/helpers";
import { fetchProducts } from "./services/api";
import { IProduct } from "./types/types";
import Form from "./components/Form/Form";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

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

  const buy = ({ id, name, price }: IProduct) => {
    if (balance < price) {
      setMessage("Insufficient funds!");
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
      );

      const change = balance - price;
      setBalance(0);

      setMessage(
        `Purchased "${name}".${
          change ? ` Change: ${formatMoney(change)}.` : ""
        }`
      );
    }
  };

  const add = () => {
    setIsModalOpen(true);
    setEditingProduct(null);
  };

  const edit = (product: IProduct) => {
    setIsModalOpen(true);
    setEditingProduct(product);
  };

  const save = (product: IProduct) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      setProducts((prev) => [product, ...prev]);
    }
  };

  const remove = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 8, lg: 9 }}>
          <InventoryManager
            products={products}
            onBuy={buy}
            onAdd={add}
            onEdit={edit}
            onRemove={remove}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
          <PaymentSystem
            balance={balance}
            onInsertCoin={insertCoin}
            message={message}
            onReturnCoins={returnCoins}
          />
        </Grid>
      </Grid>
      <Form
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={save}
        prefilledData={editingProduct}
      />
    </Container>
  );
};

export default App;
