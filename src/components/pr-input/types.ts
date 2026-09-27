type Type = "text" | "password";
type Variant = "base" | "field";

export interface Props {
  value: string;
  variant: Variant;
  type?: Type;
  placeholder?: string;
  validationMessage?: boolean;
  disabled?: boolean;
}
