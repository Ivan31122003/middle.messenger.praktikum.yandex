type Variant = "primary";

export interface Props {
  text: string;
  variant?: Variant;
  disabled?: boolean;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}
