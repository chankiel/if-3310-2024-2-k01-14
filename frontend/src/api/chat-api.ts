/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { API_URL } from "../constant";
import { APIResponse, ChatFormat, InboxFormat, UserFormat } from "../types";

class ChatApi {
  private static axios = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  static async getReceiver(room_id: string): Promise<UserFormat>{
    try {
      const response = await this.axios.get<APIResponse>(
        `/room-chats/${room_id}/receiver`
      );
      return response.data.body as UserFormat
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async getMessages(room_id: string): Promise<ChatFormat[]>{
    try {
      const response = await this.axios.get<APIResponse>(
        `/chats/${room_id}`
      );
      return response.data.body as ChatFormat[]
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async getInboxes(user_id: number): Promise<InboxFormat[]>{
    try{
      const response = await this.axios.get<APIResponse>(
        `/chats/${user_id}/inbox`,  
      )
      return response.data.body as InboxFormat[]
    }catch(error){
      throw (error as any)?.response?.data
    }
  }

  static async getRoomId(first_id: number, second_id: number){
    try{
      const response = await this.axios.get<APIResponse>(
        `/room-chats/${first_id}/${second_id}`,  
      )
      return (response.data.body as {
        room_id: number
      }).room_id
    }catch(error){
      throw (error as any)?.response?.data
    }
  }
}

export default ChatApi;
