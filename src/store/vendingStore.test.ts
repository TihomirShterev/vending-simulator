import { act } from "@testing-library/react";
import { IProduct } from "../types/types";
import { useVendingStore } from "./vendingStore";
import * as api from "../services/api";
import { formatMoney } from "../utils/helpers";
import { MOCK_PRODUCTS } from "../services/api.data";

jest.mock("../services/api");
const mockedApi = api as jest.Mocked<typeof api>;
const { getState } = useVendingStore;

describe("useVendingStore Actions", () => {
  const initialState = getState();

  beforeEach(() => {
    // Reset store
    useVendingStore.setState(initialState, true);
    jest.clearAllMocks();
  });

  describe("Vending Actions", () => {
    it("should increase balance on coin insert", () => {
      act(() => {
        useVendingStore.getState().insertCoin(1);
      });

      expect(useVendingStore.getState().balance).toBe(1);

      expect(useVendingStore.getState().message).toBe(
        `Inserted ${formatMoney(1)}.`
      );

      act(() => {
        useVendingStore.getState().insertCoin(0.5);
      });

      expect(useVendingStore.getState().balance).toBe(1.5);

      expect(useVendingStore.getState().message).toBe(
        `Inserted ${formatMoney(0.5)}.`
      );
    });

    it("should purchase the product and return change on buy", () => {
      const product = { id: 1, name: "Beer", price: 1.5, quantity: 10 };
      useVendingStore.setState({ balance: 2, products: [product] });

      act(() => {
        getState().buy(product);
      });

      const state = getState();
      expect(state.balance).toBe(0);

      expect(state.message).toContain(
        `Purchased "${product.name}". Change: ${formatMoney(0.5)}.`
      );

      expect(state.products[0].quantity).toBe(9);
    });

    it("should fail purchasing if balance is insufficient", () => {
      const product = { id: 1, name: "Beer", price: 1.5, quantity: 10 };
      useVendingStore.setState({ balance: 1, products: [product] });

      act(() => {
        getState().buy(product);
      });

      expect(getState().message).toBe("Insufficient funds!");
    });

    it("should return coins on cancel", () => {
      useVendingStore.setState({ balance: 0.8 });

      act(() => {
        getState().returnCoins();
      });

      const state = getState();
      expect(state.balance).toBe(0);
      expect(state.message).toBe(`Returned: ${formatMoney(0.8)}.`);
    });
  });

  describe("CRUD Actions", () => {
    it("should fetch products", async () => {
      mockedApi.fetchProducts.mockResolvedValue(MOCK_PRODUCTS);

      await act(async () => {
        await getState().loadProducts();
      });

      expect(getState().products).toEqual(MOCK_PRODUCTS);
    });

    it("should add a new product in add mode", () => {
      const newProduct: IProduct = {
        id: 1,
        name: "New Drink",
        price: 2,
        quantity: 5,
      };

      act(() => {
        getState().saveProduct(newProduct);
      });

      const state = getState();
      expect(state.products).toHaveLength(1);
      expect(state.products[0].name).toBe("New Drink");
      expect(state.isModalOpen).toBe(false);
    });

    it("should update an existing product in edit mode", () => {
      const existing = { id: 1, name: "Old Drink", price: 1, quantity: 1 };

      useVendingStore.setState({
        products: [existing],
        productInEditMode: existing,
      });

      const updated = { ...existing, name: "Updated Drink" };

      act(() => {
        getState().saveProduct(updated);
      });

      expect(getState().products[0].name).toBe("Updated Drink");
    });

    it("should remove the product from state", () => {
      const PRODUCT_ID = 99;

      useVendingStore.setState({
        products: [
          { id: PRODUCT_ID, name: "Expired Drink", price: 1, quantity: 1 },
        ],
      });

      act(() => {
        getState().removeProduct(PRODUCT_ID);
      });

      expect(getState().products).toHaveLength(0);
    });
  });

  describe("UI State Actions", () => {
    it("should toggle loading during products fetching", async () => {
      let resolveApi: (value: IProduct[]) => void;

      const pendingPromise = new Promise<IProduct[]>((resolve) => {
        resolveApi = resolve;
      });

      mockedApi.fetchProducts.mockReturnValue(pendingPromise);
      let loadCall: Promise<void>;

      act(() => {
        loadCall = getState().loadProducts();
      });

      expect(getState().isLoading).toBe(true);

      await act(async () => {
        resolveApi!(MOCK_PRODUCTS);
        await loadCall!;
      });

      expect(getState().isLoading).toBe(false);

      expect(getState().products).toHaveLength(MOCK_PRODUCTS.length);
    });

    it("should toggle modal open and close", () => {
      act(() => {
        getState().openModal();
      });

      expect(getState().isModalOpen).toBe(true);

      act(() => {
        getState().closeModal();
      });

      expect(getState().isModalOpen).toBe(false);
    });
  });
});
