import ContactItemTemplate from './contact-item.hbs?raw';
import './contact-item.scss';
import type { Props } from './types';
import { Block } from '@/core';

export class ContactItem extends Block<Props> {
  static componentName = 'ContactItem';
  protected template = ContactItemTemplate;

  constructor(props: Props) {
    const date = props.time ? new Date(props.time) : null;
    let time = '';

    if (date && !Number.isNaN(date.getTime())) {
      const now = new Date();
      const isToday =
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate();

      time = isToday
        ? date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        : date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
    }

    super({ ...props, time });
  }
}
