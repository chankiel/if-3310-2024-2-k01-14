/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { API_URL } from "../constant";
import { APIResponse, ConnectionFormat, ConnectionReqRequest } from "../types";

class ConnectionApi {
  private static axios = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  static async createRequest(payload: ConnectionReqRequest){
    try {
      const response = await this.axios.post<APIResponse>(
        "/connection-requests", payload
      );
      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async getConnections(user_id: number): Promise<ConnectionFormat[]> {
    try {
      const response = await this.axios.get<APIResponse>(
        `/connections/${user_id}`
      );
      return response.data.body as ConnectionFormat[];
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async getPendingRequests(
    user_id: number
  ): Promise<ConnectionFormat[]> {
    const response = await this.axios.get<APIResponse>(
      `/connection-requests/${user_id}/pending`
    );

    return response.data.body as ConnectionFormat[];
  }

  static async deleteConnection(from_id: number, to_id: number): Promise<APIResponse> {
    try {
      const res = await this.axios.delete<APIResponse>(`/connections/${from_id}/${to_id}`);
      return res.data
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async respondRequest(from_id: number, to_id: number,isAccept: boolean): Promise<APIResponse> {
    try {
      const res = await this.axios.put<APIResponse>(`/connection-requests/${from_id}/${to_id}/${isAccept? "accept":"reject"}`);
      return res.data
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async deleteConnectionRequest(from_id: number, to_id: number): Promise<APIResponse> {
    try {
      const res = await this.axios.delete<APIResponse>(`/connection-requests/${from_id}/${to_id}`);
      return res.data
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }
}

export default ConnectionApi;
