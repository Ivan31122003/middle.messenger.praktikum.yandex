export interface FieldProps {
  name: string;
  caption: string;
  type?: string;
}

export interface Props {
  fields: FieldProps[];
}
