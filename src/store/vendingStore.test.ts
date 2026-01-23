import { act } from "@testing-library/react";
import { useVendingStore } from "./vendingStore";
import * as api from "../services/api";
import { formatMoney } from "../utils/helpers";

// Mock the API for controlled loadProducts testing
jest.mock("../services/api");
const mockedApi = api as jest.Mocked<typeof api>;

describe("useVendingStore Actions", () => {
  const initialState = useVendingStore.getState();

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

      act(() => {
        useVendingStore.getState().insertCoin(0.5);
      });

      expect(useVendingStore.getState().balance).toBe(1.5);
    });

    it("should purchase the product and return change on buy", () => {
      const product = { id: 1, name: "Beer", price: 1.5, quantity: 10 };
      useVendingStore.setState({ balance: 2.0, products: [product] });

      act(() => {
        useVendingStore.getState().buy(product);
      });

      const state = useVendingStore.getState();
      expect(state.balance).toBe(0);

      expect(state.message).toContain(
        `Purchased "${product.name}". Change: ${formatMoney(0.5)}.`
      );

      expect(state.products[0].quantity).toBe(9);
    });

    it("should fail purchasing if balance is insufficient", () => {
      const product = { id: 1, name: "Beer", price: 1.5, quantity: 10 };
      useVendingStore.setState({ balance: 1 });

      act(() => {
        useVendingStore.getState().buy(product);
      });

      expect(useVendingStore.getState().message).toBe("Insufficient funds!");
    });

    it("should return coins on cancel", () => {
      useVendingStore.setState({ balance: 0.8 });

      act(() => {
        useVendingStore.getState().returnCoins();
      });

      const state = useVendingStore.getState();
      expect(state.balance).toBe(0);
      expect(state.message).toBe(`Returned: ${formatMoney(0.8)}.`);
    });
  });

  describe("CRUD Actions", () => {
    it("should fetch products on load", async () => {
      const mockProducts = [
        { id: 1, name: "Test Drink", price: 1, quantity: 5 },
      ];
      mockedApi.fetchProducts.mockResolvedValue(mockProducts);

      await act(async () => {
        await useVendingStore.getState().loadProducts();
      });

      expect(useVendingStore.getState().products).toEqual(mockProducts);
    });

    it("should add a new product in add mode", () => {
      const newProduct = { name: "New Drink", price: 2, quantity: 5 } as any;

      act(() => {
        useVendingStore.getState().saveProduct(newProduct);
      });

      const state = useVendingStore.getState();
      expect(state.products).toHaveLength(1);
      expect(state.products[0].name).toBe("New Drink");
      expect(state.isModalOpen).toBe(false);
    });

    it("should update an existing product in edit mode", () => {
      const existing = { id: 1, name: "Old Drink", price: 1, quantity: 1 };

      useVendingStore.setState({
        products: [existing],
        editingProduct: existing,
      });

      const updated = { ...existing, name: "Updated Drink" };

      act(() => {
        useVendingStore.getState().saveProduct(updated);
      });

      expect(useVendingStore.getState().products[0].name).toBe("Updated Drink");
    });

    it("should remove the product from state", () => {
      useVendingStore.setState({
        products: [{ id: 99, name: "Expired Drink", price: 1, quantity: 1 }],
      });

      act(() => {
        useVendingStore.getState().removeProduct(99);
      });

      expect(useVendingStore.getState().products).toHaveLength(0);
    });
  });

  describe("Modal UI Actions", () => {
    it("should toggle state on modal open and close", () => {
      act(() => {
        useVendingStore.getState().openModal();
      });

      expect(useVendingStore.getState().isModalOpen).toBe(true);

      act(() => {
        useVendingStore.getState().closeModal();
      });

      expect(useVendingStore.getState().isModalOpen).toBe(false);
      expect(useVendingStore.getState().editingProduct).toBeNull();
    });
  });
});
