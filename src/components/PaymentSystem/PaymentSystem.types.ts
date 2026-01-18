export interface PaymentSystemProps {
  balance: number;
  onInsertCoin: (coin: number) => void;
  message: string;
}
