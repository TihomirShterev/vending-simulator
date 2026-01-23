import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/DeleteOutline";
import { IProduct } from "../../../types/types";
import { useVendingStore } from "../../../store/vendingStore";
import { formatMoney } from "../../../utils/helpers";

interface ProductProps {
  data: IProduct;
}

const Product = ({ data: { id, name, price, quantity } }: ProductProps) => {
  const buy = useVendingStore((state) => state.buy);
  const removeProduct = useVendingStore((state) => state.removeProduct);
  const openModal = useVendingStore((state) => state.openModal);

  return (
    <Card sx={{ p: 1 }}>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", p: 0 }}
      >
        <IconButton
          size="small"
          onClick={() => openModal({ id, name, price, quantity })}
          aria-label={`Edit ${name}`}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => removeProduct(id)}
          aria-label={`Remove ${name}`}
        >
          <RemoveIcon fontSize="small" color="error" />
        </IconButton>
      </CardActions>
      <CardContent sx={{ textAlign: "center", py: 0 }}>
        <Typography variant="h6">{name}</Typography>
        <Typography color="primary.main" variant="h5">
          {formatMoney(price)}
        </Typography>
        <Typography variant="body2">
          {quantity === 0 ? "Out of Stock" : `In Stock: ${quantity}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          disabled={quantity === 0}
          onClick={() => buy({ id, name, price, quantity })}
        >
          Buy
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
