import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import { IProduct } from "../types/types";

export const useInventory = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const removeProduct = useCallback(
    (id: number) => {
      setProducts(products.filter((p) => p.id !== id));
    },
    [products]
  );

  // on buy
  const decQty = useCallback((id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
    );
  }, []);

  // form logic
  const openAddModal = useCallback(() => {
    setIsModalOpen(true);
    setEditingProduct(null);
  }, []);

  const openEditModal = useCallback((product: IProduct) => {
    setIsModalOpen(true);
    setEditingProduct(product);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingProduct(null);
  }, []);

  const saveProduct = useCallback(
    (product: IProduct) => {
      setProducts((prev) =>
        editingProduct
          ? prev.map((p) => (p.id === product.id ? product : p))
          : [product, ...prev]
      );

      closeModal();
    },
    [editingProduct, closeModal]
  );

  return {
    products,
    removeProduct,
    decQty,
    openAddModal,
    openEditModal,
    isModalOpen,
    closeModal,
    editingProduct,
    saveProduct,
  };
};
