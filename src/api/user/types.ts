export type UpdateProfileData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

export type SearchUser = {
  login: string;
};
