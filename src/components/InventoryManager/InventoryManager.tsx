import { Grid, Paper, Typography } from "@mui/material";
import { InventoryManagerProps } from "./InventoryManager.types";
import Product from "./Product/Product";

const InventoryManager = ({ products }: InventoryManagerProps) => (
  <Paper sx={{ p: 3, bgcolor: "#f5f5f5" }}>
    <Typography variant="h5">Products</Typography>
    <Grid container spacing={2} alignItems="space-between">
      {products.map((productData) => (
        <Grid key={productData.id} size={{ xs: 6, sm: 4, md: 3 }}>
          <Product data={productData} />
        </Grid>
      ))}
    </Grid>
  </Paper>
);

export default InventoryManager;
