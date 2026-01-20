import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { InventoryManagerProps } from "./InventoryManager.types";
import Product from "./Product/Product";

const InventoryManager = ({
  products,
  onBuy,
  onAdd,
  onEdit,
  onRemove,
}: InventoryManagerProps) => (
  <Paper sx={{ p: 3, bgcolor: "#f5f5f5" }}>
    <Box
      sx={{ display: "flex", gap: 1, justifyContent: "space-between", mb: 2 }}
    >
      <Typography variant="h5">Products</Typography>
      <Button variant="outlined" onClick={onAdd}>
        Add New Product
      </Button>
    </Box>
    <Grid container spacing={2} alignItems="space-between">
      {products.map((productData) => (
        <Grid key={productData.id} size={{ xs: 6, md: 4, lg: 3 }}>
          <Product
            data={productData}
            onBuy={onBuy}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        </Grid>
      ))}
    </Grid>
  </Paper>
);

export default InventoryManager;
