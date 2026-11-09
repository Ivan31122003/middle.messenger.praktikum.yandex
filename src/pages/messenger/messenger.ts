import MessengerPageTemplate from './messenger.hbs?raw';
import './messenger.scss';
import { Block } from '@/core/block';
import { chatController } from '@/controllers/chat';
import { message } from '@/components/pr-message';

export class MessengerPage extends Block {
  static componentName = 'MessengerPage';
  protected template = MessengerPageTemplate;

  private isLoading = false;

  public override show(): void {
    super.show();
    void this.loadChats();
  }

  private async loadChats(): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    try {
      const result = await chatController.fetchChats();

      if (!result.ok) {
        message.error(result.reason);
      }
    } finally {
      this.isLoading = false;
    }
  }
}
