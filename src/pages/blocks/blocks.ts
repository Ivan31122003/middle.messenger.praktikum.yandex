import { registerComponent } from '@/core';
import { UploadUserAvatarModal } from './upload-user-avatar-modal';
import { LoginForm } from './login-form';
import { RegForm } from './reg-form';
import { ContactItem } from './contact-item';
import { InfoRow } from './info-row';
import { CreateChatModal } from './create-chat-modal';
import { AddUserModal } from './add-user-modal';
import { DeleteUserModal } from './delete-user-modal';
import { Contacts } from './contacts';
import { ProfileInfoBlock } from './profile-info-block';
import { ProfileChangeDataForm } from './profile-change-data-form';
import { ProfileChangePasswordForm } from './profile-change-password-form';

import { ChatConversation } from './chat-conversation';
import { ChatWriteForm } from './chat-write-form';
import { Chat } from './chat';

export const registerBlocks = () => {
  registerComponent(UploadUserAvatarModal);
  registerComponent(LoginForm);
  registerComponent(RegForm);
  registerComponent(ContactItem);
  registerComponent(InfoRow);
  registerComponent(CreateChatModal);
  registerComponent(AddUserModal);
  registerComponent(DeleteUserModal);
  registerComponent(Contacts);
  registerComponent(ProfileInfoBlock);
  registerComponent(ProfileChangeDataForm);
  registerComponent(ProfileChangePasswordForm);

  registerComponent(ChatConversation);
  registerComponent(ChatWriteForm);
  registerComponent(Chat);
};
