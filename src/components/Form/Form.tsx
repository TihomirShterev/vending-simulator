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
import { IProduct } from "../../types/types";
import { FormProps } from "./Form.types";
import { FORM_DATA } from "./Form.data";

const Form = ({ open, onClose, onSave }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProduct>();

  useEffect(() => {
    reset();
  }, [reset, open]);

  const onSubmit = ({ name, price, quantity }: IProduct) => {
    onSave({
      id: Date.now(),
      name,
      price: Number(price),
      quantity: Number(quantity),
    });

    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle sx={{ pb: 0 }}>Add New Product</DialogTitle>
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
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Form;
