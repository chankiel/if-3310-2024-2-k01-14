/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "js-cookie"
import { API_URL } from "../constant";
import { AuthRequest, AuthResponse, UpdateUserRequest, UserRequest, UserResponse, UserResponseWithId } from "../types";

class UserApi {
  private static token = Cookies.get("token") || "";
  private static axios = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    },
  });

  static async getUsers(query: string): Promise<UserResponse[]>{
    try{
        const response = await this.axios.get<UserResponse[]>(`/profile/?q=${query}`)

        return response.data
    }catch(error){
        throw (error as any)?.response?.data;
    }
  }

  static async getUser(user_id: string): Promise<UserResponse>{
    try{
        const response = await this.axios.get<UserResponse>(`/profile/${user_id}`)

        return response.data
    }catch(error){
        throw (error as any)?.response?.data;
    }
  }

  static async getSelf(): Promise<UserResponseWithId>{
    try{
        const response = await this.axios.get<UserResponseWithId>(`/profile/me`)

        return response.data
    }catch(error){
        throw (error as any)?.response?.data;
    }
  }

  // static async updateUser(user_id: number, payload: UpdateUserRequest): Promise<UserResponse


  static async login(payload: AuthRequest){
    try {
        const response = await this.axios.post<AuthResponse>("/login", payload);
  
        return response.data;
      } catch (error) {
        throw (error as any)?.response?.data;
      }
  }

  static async register(payload: UserRequest): Promise<UserResponse> {
    try {
      const response = await this.axios.post<UserResponse>(
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
