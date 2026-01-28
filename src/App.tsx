import { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import PaymentSystem from "./components/PaymentSystem/PaymentSystem";
import InventoryManager from "./components/InventoryManager/InventoryManager";
import ProductForm from "./components/ProductForm/ProductForm";
import { useVendingStore } from "./store/vendingStore";

const App = () => {
  const loadProducts = useVendingStore((state) => state.loadProducts);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 8, lg: 9 }}>
          <InventoryManager />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
          <PaymentSystem />
        </Grid>
      </Grid>
      <ProductForm />
    </Container>
  );
};

export default App;
