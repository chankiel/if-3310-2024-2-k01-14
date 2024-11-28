/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_URL } from "../constant";
import { APIResponse, AuthRequest, UserFormat, UserRequest } from "../types";

class UserApi {
  private static axios = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  static async getUsers(query: string): Promise<UserFormat[]>{
    try{
        const response = await this.axios.get(`/profile/?q=${query}`)

        return response.data.body
    }catch(error){
        throw (error as any)?.response?.data;
    }
  }

  static async getUser(user_id: string): Promise<UserFormat>{
    try{
        const response = await this.axios.get(`/profile/${user_id}`)

        return response.data.body
    }catch(error){
        throw (error as any)?.response?.data;
    }
  }

  static async getSelf(): Promise<UserFormat>{
    try{
        const response = await this.axios.get(`/profile/self`)

        return response.data.body
    }catch(error){
        throw (error as any)?.response?.data;
    }
  }

  // static async updateUser(user_id: number, payload: UpdateUserRequest): Promise<UserResponse

  static async login(payload: AuthRequest){
    try {
        const response = await this.axios.post<APIResponse>("/login", payload);
        return response.data;
      } catch (error) {
        throw (error as any)?.response?.data;
      }
  }

  static async logout(){
    try {
        const response = await this.axios.post<APIResponse>("/logout");
  
        return response.data;
      } catch (error) {
        throw (error as any)?.response?.data;
      }
  }

  static async register(payload: UserRequest): Promise<UserFormat> {
    try {
      const response = await this.axios.post(
        "/register",
        payload
      );

      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }
}

export default UserApi
