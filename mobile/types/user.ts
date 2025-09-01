export type UserType = {
  id: string;
  username: string | null;
  hasDownloadedDefaultLabels: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserState = UserType | null;
