import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { formatMoney } from "../../../utils/helpers";
import { ProductProps } from "./Product.types";

const Product = ({
  data: { id, name, price, quantity },
  onBuy,
  onEdit,
}: ProductProps) => (
  <Card sx={{ p: 1 }}>
    <CardActions
      sx={{ display: "flex", justifyContent: "space-between", p: 0 }}
    >
      <IconButton
        size="small"
        onClick={() => onEdit({ id, name, price, quantity })}
        aria-label={`Edit ${name}`}
      >
        <EditIcon fontSize="small" />
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
        onClick={() => onBuy({ id, name, price, quantity })}
      >
        Buy
      </Button>
    </CardActions>
  </Card>
);

export default Product;
