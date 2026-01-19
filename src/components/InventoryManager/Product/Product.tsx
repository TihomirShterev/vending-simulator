import { Card, CardContent, Typography } from "@mui/material";
import { formatMoney } from "../../../utils/helpers";
import { ProductProps } from "./Product.types";

const Product = ({ data: { id, name, price, quantity } }: ProductProps) => (
  <Card>
    <CardContent sx={{ textAlign: "center" }}>
      <Typography variant="h6">{name}</Typography>
      <Typography color="primary.main" variant="h5">
        {formatMoney(price)}
      </Typography>
      <Typography variant="body2">
        {quantity === 0 ? "Out of Stock" : `In Stock: ${quantity}`}
      </Typography>
    </CardContent>
  </Card>
);

export default Product;
