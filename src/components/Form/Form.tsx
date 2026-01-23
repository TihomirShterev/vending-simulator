import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { IProduct } from "@/types/types";
import { useVendingStore } from "../../store/vendingStore";

interface Field {
  name: "name" | "price" | "quantity";
  label: string;
  validate?: (value: number | string) => boolean | string;
}

const MIN_COIN = 0.01;
const MIN_PRODUCTS = 1;
const MAX_PRODUCTS = 15;
const DECIMAL_PLACES_PATTERN = /^\d+(\.\d{1,2})?$/; // Max 2 decimal places

const FORM_DATA: Field[] = [
  {
    name: "name",
    label: "Product Name",
  },
  {
    name: "price",
    label: "Price (€)",
    validate: (value) =>
      (DECIMAL_PLACES_PATTERN.test(value.toString()) && MIN_COIN <= value) ||
      "Please enter a positive number. Maximum two decimal places allowed.",
  },
  {
    name: "quantity",
    label: `Initial Stock (max ${MAX_PRODUCTS} items)`,
    validate: (value) =>
      (Number.isInteger(value) &&
        MIN_PRODUCTS <= value &&
        value <= MAX_PRODUCTS) ||
      `Please enter an integer between ${MIN_PRODUCTS} and ${MAX_PRODUCTS}.`,
  },
];

const Form = () => {
  const isModalOpen = useVendingStore((state) => state.isModalOpen);
  const closeModal = useVendingStore((state) => state.closeModal);
  const editingProduct = useVendingStore((state) => state.editingProduct);
  const saveProduct = useVendingStore((state) => state.saveProduct);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IProduct>();

  const isEditMode = !!editingProduct;

  useEffect(() => {
    if (isEditMode) {
      Object.entries(editingProduct).forEach(([key, value]) => {
        setValue(key as keyof IProduct, value);
      });
    } else {
      reset();
    }
  }, [isEditMode, editingProduct, setValue, reset]);

  const onSubmit = (data: IProduct) => {
    saveProduct(data);
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={isModalOpen} onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle sx={{ pb: 0 }}>
          {isEditMode ? "Edit" : "Add New"} Product
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {FORM_DATA.map(({ name, label, validate }) => {
              const errorMessage = errors[name]?.message;

              return (
                <TextField
                  key={name}
                  size="small"
                  label={label}
                  {...register(name, {
                    required: "This field is required.",
                    valueAsNumber: name === "price" || name === "quantity",
                    validate,
                  })}
                  error={!!errorMessage}
                  helperText={errorMessage}
                />
              );
            })}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={closeModal} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {isEditMode ? "Save Changes" : "Add Product"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Form;
