import { Alert, Box, Button, Divider, Paper, Typography } from "@mui/material";
import { formatMoney } from "../../utils/helpers";
import { ACCEPTED_COINS } from "./PaymentSystem.data";
import { PaymentSystemProps } from "./PaymentSystem.types";

const PaymentSystem = ({
  balance,
  onInsertCoin,
  message,
  onReturnCoins,
}: PaymentSystemProps) => (
  <Paper sx={{ p: 3, textAlign: "center" }}>
    <Typography variant="h5">Balance: {formatMoney(balance)}</Typography>
    <Divider sx={{ my: 2 }} />
    <Typography variant="subtitle2" gutterBottom>
      Insert Coins
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        justifyContent: "center",
        mb: 3,
      }}
    >
      {ACCEPTED_COINS.map((coin) => (
        <Button
          key={coin}
          variant="contained"
          color="secondary"
          onClick={() => onInsertCoin(coin)}
        >
          {formatMoney(coin)}
        </Button>
      ))}
    </Box>
    <Button
      variant="outlined"
      color="warning"
      onClick={onReturnCoins}
      disabled={balance === 0}
    >
      Cancel & Return Coins
    </Button>
    {message && (
      <Alert severity="info" sx={{ mt: 3 }}>
        {message}
      </Alert>
    )}
  </Paper>
);

export default PaymentSystem;
