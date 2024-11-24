export type ConnectionReqResponse = {
  from: {
    full_name: string | null;
    profile_photo_path: string | null;
    work_history: string | null;
    skills: string | null;
  };
}[];

export type ConnectionReq = {
  from_id: number;
  to_id: number;
};

export type RespondReq = ConnectionReq & {
    accept: boolean
}
