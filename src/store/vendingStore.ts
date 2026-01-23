import { create } from "zustand";
import { fetchProducts } from "../services/api";
import { formatMoney } from "../utils/helpers";
import { IProduct } from "../types/types";

interface VendingState {
  // State
  balance: number;
  message: string;
  products: IProduct[];
  isModalOpen: boolean;
  editingProduct: IProduct | null;
  // Actions
  insertCoin: (coin: number) => void;
  returnCoins: () => void;
  buy: (product: IProduct) => void;
  loadProducts: () => Promise<void>;
  removeProduct: (id: number) => void;
  openModal: (product?: IProduct) => void;
  closeModal: () => void;
  saveProduct: (data: IProduct) => void;
}

export const useVendingStore = create<VendingState>((set, get) => ({
  balance: 0,
  message: "",
  products: [],
  isModalOpen: false,
  editingProduct: null,
  // Vending
  insertCoin: (coin) => {
    set((state) => ({
      balance: state.balance + coin,
      message: `Inserted ${formatMoney(coin)}.`,
    }));
  },
  returnCoins: () =>
    set((state) => ({
      balance: 0,
      message: `Returned: ${formatMoney(state.balance)}.`,
    })),
  buy: ({ id, name, price }) => {
    const { balance } = get();

    if (balance < price) {
      set({ message: "Insufficient funds!" });
    } else {
      const change = balance - price;

      set((state) => ({
        balance: 0,
        products: state.products.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        ),
        message: `Purchased "${name}".${
          change ? ` Change: ${formatMoney(change)}.` : ""
        }`,
      }));
    }
  },
  // CRUD
  loadProducts: async () => {
    const products = await fetchProducts();
    set({ products });
  },
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
  openModal: (product) =>
    set({ isModalOpen: true, editingProduct: product || null }),
  closeModal: () => set({ isModalOpen: false, editingProduct: null }),
  saveProduct: (data) =>
    set((state) => {
      const isEditMode = !!state.editingProduct;

      return {
        products: isEditMode
          ? state.products.map((p) => (p.id === data.id ? data : p))
          : [{ ...data, id: Date.now() }, ...state.products],
        isModalOpen: false,
      };
    }),
}));
