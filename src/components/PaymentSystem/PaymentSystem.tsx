import { Alert, Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useVendingStore } from "../../store/vendingStore";
import { formatMoney } from "../../utils/helpers";
import { ACCEPTED_COINS } from "./PaymentSystem.data";

const PaymentSystem = () => {
  const balance = useVendingStore((state) => state.balance);
  const insertCoin = useVendingStore((state) => state.insertCoin);
  const message = useVendingStore((state) => state.message);
  const returnCoins = useVendingStore((state) => state.returnCoins);

  return (
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
            onClick={() => insertCoin(coin)}
          >
            {formatMoney(coin)}
          </Button>
        ))}
      </Box>
      <Button
        variant="outlined"
        color="warning"
        onClick={returnCoins}
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
};

export default PaymentSystem;
