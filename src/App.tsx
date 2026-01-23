import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import PaymentSystem from "./components/PaymentSystem/PaymentSystem";
import InventoryManager from "./components/InventoryManager/InventoryManager";
import Form from "./components/Form/Form";
import { IProduct } from "./types/types";
import { usePayment } from "./hooks/usePayment";
import { fetchProducts } from "./services/api";

const App = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const { balance, message, insertCoin, returnCoins, buy } = usePayment();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const decQty = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
    );
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
            onBuy={(p) => buy(p, decQty)}
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
