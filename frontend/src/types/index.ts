export type User = {
  id: number;
  username: string;
  full_name?: string | null;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  profile_photo_path?: string | null;
  work_history?: string | null;
  skills?: string | null;
  feeds: Feed[];
  chatsFrom: Chat[];
  chatsTo: Chat[];
  connectionsFrom: Connection[];
  connectionsTo: Connection[];
  connectionRequestsFrom: ConnectionRequest[];
  connectionRequestsTo: ConnectionRequest[];
  pushSubscriptions: PushSubscription[];
};

export type Feed = {
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
};

export type Chat = {
  id: number;
  timestamp: Date;
  from_id: number;
  to_id: number;
  message: string;
  from: User;
  to: User;
};

export type ConnectionRequest = {
  from_id: number;
  to_id: number;
  created_at: Date;
  from: User;
  to: User;
};

export type Connection = {
  from_id: number;
  to_id: number;
  created_at: Date;
  from: User;
  to: User;
};

export type PushSubscription = {
  endpoint: string;
  user_id?: number | null;
  keys: Record<string, string>;
  created_at: Date;
  user?: User | null;
};

export type AuthRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type ConnectionReqRequest = {
  from_id: number;
  to_id: number;
};

export type RespondRequest = ConnectionRequest & {
  accept: boolean;
};

export type ConnectionResponse = {
  full_name: string | null;
  profile_photo_path: string | null;
  work_history: string | null;
  skills: string | null;
};

export type UserRequest = {
  email: string;
  username: string;
  password: string;
  full_name: string;
}

export type UserResponse = {
  id: number;
  username: string;
  full_name: string|null;
  work_history: string | null;
  skills: string | null;
  profile_photo: string | null;
  relevant_posts: Feed[];
};
