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
  feeds: FeedFormat[];
  chatsFrom: ChatFormat[];
  chatsTo: ChatFormat[];
  connectionsFrom: Connection[];
  connectionsTo: Connection[];
  connectionRequestsFrom: ConnectionRequest[];
  connectionRequestsTo: ConnectionRequest[];
  pushSubscriptions: PushSubscription[];
};

export type FeedFormat = {
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
};

export type ChatFormat = {
  id?: number;
  timestamp: Date;
  from_id: number;
  to_id: number;
  message: string;
  room_id: number;
}

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

export type APIResponse = {
  status: boolean;
  message: string;
  body: unknown;
}

export type AuthRequest = {
  identifier: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type ConnectionReqRequest = {
  from_id: number;
  to_id: number;
};

export type RespondRequest = ConnectionReqRequest & {
  accept: boolean;
};

export type ConnectionFormat = {
  id: string;
  username: string;
  full_name: string | null;
  profile_photo_path: string | null;
  created_at: Date;
};

export type ConnectionResponse = APIResponse & {
  body: ConnectionFormat[]
}

export type UserRequest = {
  email: string;
  username: string;
  password: string;
  name: string;
}

export type UpdateUserRequest = {
  username?: string;
  profile_photo?: File;
  name?: string;
  work_history?: string;
  skills?: string;
};

export type UserFormat = {
  id?: string;
  username: string;
  name: string | null;
  work_history: string | null;
  skills: string | null;
  profile_photo: string | null;
  connection_count: number;
  relevant_posts?: FeedFormat[];
  is_connected?: boolean;
  is_requested?: boolean;
  room_id?: number | null;
};

export type RoomChatFormat =  {
  id: number;
  updated_at: Date;
  first_user_id: number;
  second_user_id: number;
  last_message: string | null;
  last_sender_id: number | null;
}

export type FeedResponse = APIResponse & {
  body: FeedFormat[]
}