import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { formatMoney } from "../../../utils/helpers";
import { ProductProps } from "./Product.types";

const Product = ({
  data: { id, name, price, quantity },
  onBuy,
}: ProductProps) => (
  <Card sx={{ p: 1 }}>
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
