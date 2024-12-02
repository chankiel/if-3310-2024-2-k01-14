export type ConnectionFormat = {
    id: number;
    username: string;
    full_name: string | null;
    profile_photo_path: string | null;
    created_at: Date;
    room_id?: number;
};

export type ConnectionReqRequest = {
  from_id: number;
  to_id: number;
};

export type RespondRequest = ConnectionReqRequest & {
    accept: boolean
}
