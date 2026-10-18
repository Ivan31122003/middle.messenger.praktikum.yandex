import { registerComponent } from '@/core';
import { LoginForm } from './login-form';
import { RegForm } from './reg-form';
import { ContactItem } from './contact-item';
import { InfoRow } from './info-row';
import { Contacts } from './contacts';
import { ProfileInfoBlock } from './profile-info-block';
import { ProfileChangeDataForm } from './profile-change-data-form';
import { ProfileChangePasswordForm } from './profile-change-password-form';

import { ChatConversation } from './chat-conversation';
import { ChatWriteForm } from './chat-write-form';
import { Chat } from './chat';

export const registerBlocks = () => {
  registerComponent(LoginForm);
  registerComponent(RegForm);
  registerComponent(ContactItem);
  registerComponent(InfoRow);
  registerComponent(Contacts);
  registerComponent(ProfileInfoBlock);
  registerComponent(ProfileChangeDataForm);
  registerComponent(ProfileChangePasswordForm);

  registerComponent(ChatConversation);
  registerComponent(ChatWriteForm);
  registerComponent(Chat);
};
