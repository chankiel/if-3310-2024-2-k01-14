import { FeedFormat } from "./feed-model";

export type UserFormat = {
  username: string;
  description: string | null;
  photo_profile: string | null;
  relevant_posts: FeedFormat[];
};

export type CreateUserRequest = {
  username: string;
  email: string;
  password: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  username?: string;
  description?: string;
  photo_profile?: string;
};
