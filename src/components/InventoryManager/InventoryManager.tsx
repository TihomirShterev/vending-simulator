import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Product from "./Product/Product";
import ProductSkeleton from "./ProductSkeleton/ProductSkeleton";
import { useVendingStore } from "../../store/vendingStore";

const InventoryManager = () => {
  const isLoading = useVendingStore((state) => state.isLoading);
  const products = useVendingStore((state) => state.products);
  const openModal = useVendingStore((state) => state.openModal);

  return (
    <Paper sx={{ p: 3, bgcolor: "#f5f5f5" }}>
      <Box
        sx={{ display: "flex", gap: 1, justifyContent: "space-between", mb: 2 }}
      >
        <Typography variant="h5">Products</Typography>
        <Button variant="outlined" onClick={() => openModal()}>
          Add New Product
        </Button>
      </Box>
      <Grid container spacing={2} alignItems="space-between">
        {isLoading
          ? Array.from(new Array(6)).map((_, index) => (
              <Grid key={`skeleton-${index}`} size={{ xs: 6, md: 4, lg: 3 }}>
                <ProductSkeleton />
              </Grid>
            ))
          : products.map((productData) => (
              <Grid key={productData.id} size={{ xs: 6, md: 4, lg: 3 }}>
                <Product data={productData} />
              </Grid>
            ))}
      </Grid>
    </Paper>
  );
};

export default InventoryManager;
