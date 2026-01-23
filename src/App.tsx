import { Container, Grid } from "@mui/material";
import PaymentSystem from "./components/PaymentSystem/PaymentSystem";
import InventoryManager from "./components/InventoryManager/InventoryManager";
import Form from "./components/Form/Form";
import { usePayment } from "./hooks/usePayment";
import { useInventory } from "./hooks/useInventory";

const App = () => {
  const { balance, message, insertCoin, returnCoins, buy } = usePayment();

  const {
    products,
    removeProduct,
    decQty,
    openAddModal,
    openEditModal,
    isModalOpen,
    closeModal,
    editingProduct,
    saveProduct,
  } = useInventory();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 8, lg: 9 }}>
          <InventoryManager
            products={products}
            onBuy={(p) => buy(p, decQty)}
            onAdd={openAddModal}
            onEdit={openEditModal}
            onRemove={removeProduct}
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
        onClose={closeModal}
        onSave={saveProduct}
        prefilledData={editingProduct}
      />
    </Container>
  );
};

export default App;
