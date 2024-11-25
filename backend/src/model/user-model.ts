import { FeedFormat } from "./feed-model";

export type UserFormat = {
  username: string;
  name: string | null;
  work_history: string | null;
  skills: string | null;
  profile_photo: string | null;
  connection_count: number;
  relevant_posts?: FeedFormat[];
};

export type UserPrismaFormat = {
  username: string;
  full_name: string | null;
  profile_photo_path: string | null;
  work_history: string | null;
  skills: string | null;
  feeds: {
    id: number;
    created_at: Date;
    updated_at: Date;
    content: string;
  }[];
  _count: {
    connectionsFrom: number;
  };
};

export type CreateUserRequest = {
  username: string;
  email: string;
  full_name: string;
  password: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  username?: string;
  profile_photo?: File;
  name?: string;
  work_history?: string;
  skills?: string;
};
