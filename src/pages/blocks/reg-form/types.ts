import type { BlockOwnProps } from '@/core/block';

export interface RegField {
  name: string;
  caption: string;
  type?: 'text' | 'password' | 'email' | 'tel';
}

export interface Props extends BlockOwnProps {
  fields: RegField[];
}
