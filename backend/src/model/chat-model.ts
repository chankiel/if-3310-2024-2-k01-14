export type CreateDeleteRoomRequest = {
  first_id: number;
  second_id: number;
};

export type JoinLeaveRoomRequest = {
  userId: string;
  roomId: string;
};

export type MessageData = {
  senderId: string;
  receiverId: string;
  roomId: string;
  message: string;
};

export type ChatFormat = {
  id: number;
  timestamp: Date;
  from_id: number;
  to_id: number;
  message: string;
  room_id: number;
}