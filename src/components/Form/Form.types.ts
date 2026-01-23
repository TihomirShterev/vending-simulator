export interface Field {
  name: "name" | "price" | "quantity";
  label: string;
  validate?: (value: number | string) => boolean | string;
}
