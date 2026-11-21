import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Handlebars from 'handlebars';
import { ContactItem } from './contact-item';

describe('ContactItem', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 21, 12));
    Handlebars.registerHelper('PrAvatar', () => '');
  });

  afterEach(() => {
    vi.useRealTimers();
    Handlebars.unregisterHelper('PrAvatar');
  });

  function render(time: string, unreadMessagesNumber = 0) {
    return new ContactItem({
      id: 1,
      name: '<Alice>',
      lastMessageIsYour: false,
      lastMessage: '<script>alert(1)</script>',
      time,
      unreadMessagesNumber,
    }).element();
  }

  it('shows time for today', () => {
    expect(
      render(new Date(2026, 10, 21, 9, 5).toISOString()).querySelector('.meta__last-message-time')
        ?.textContent,
    ).toBe('09:05');
  });

  it('shows a full date for another day', () => {
    expect(
      render(new Date(2026, 0, 2, 9).toISOString()).querySelector('.meta__last-message-time')
        ?.textContent,
    ).toBe('02.01.2026');
  });

  it.each(['', 'invalid'])('hides invalid or missing dates: %s', (time) => {
    expect(render(time).querySelector('.meta__last-message-time')?.textContent).toBe('');
  });

  it('escapes user content', () => {
    const root = render('');
    expect(root.querySelector('script')).toBeNull();
    expect(root.querySelector('.content__name')?.textContent).toBe('<Alice>');
    expect(root.querySelector('.content__last-message')?.textContent).toBe(
      '<script>alert(1)</script>',
    );
  });

  it('only shows a nonzero unread count', () => {
    expect(render('').querySelector('.meta__unread-messages-number')).toBeNull();
    expect(render('', 3).querySelector('.meta__unread-messages-number')?.textContent?.trim()).toBe(
      '3',
    );
  });
});
