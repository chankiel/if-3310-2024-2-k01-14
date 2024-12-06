import { FeedFormat } from "./feed-model";

export type UserFormat = {
  id?: number;
  username: string;
  full_name: string | null;
  work_history?: string | null;
  skills?: string | null;
  profile_photo?: string | null;
  connection_count?: number;
  feeds?: FeedFormat[];
  is_connected?: boolean;
  is_requested?: boolean;
  got_request?: boolean;
  room_id?: number | null;
};

export type UserPrismaFormat = {
  id?: number;
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
  identifier: string;
  password: string;
};

export type UpdateUserRequest = {
  username?: string;
  profile_photo?: Express.Multer.File;
  name?: string;
  work_history?: string;
  skills?: string;
};
