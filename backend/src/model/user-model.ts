import { FeedFormat } from "./feed-model";

export type UserFormat = {
  name: string | null;
  work_history: string | null;
  skills: string | null;
  profile_photo: string | null;
  relevant_posts: FeedFormat[];
};

export type UserPrismaFormat = {
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
}

export type CreateUserRequest = {
  username: string;
  email: string;
  name:string;
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
