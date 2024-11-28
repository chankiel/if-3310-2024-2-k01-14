/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

import { API_URL } from "../constant";
import { ConnectionFormat, ConnectionResponse } from "../types";

class ConnectionApi{
    private static axios = axios.create({
        baseURL: API_URL,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    static async getConnections(user_id: number): Promise<ConnectionFormat[]>{
        try{
            const response = await this.axios.get<ConnectionResponse>(`/connections/${user_id}`)
            return response.data.body
        }catch(error){
            throw (error as any)?.response?.data;
        }
    }

    static async getPendingRequests(user_id: number ): Promise<ConnectionFormat[]>{
        try{
            const response = await this.axios.get<ConnectionResponse>(`/connection-requests/${user_id}/pending`)

            return response.data.body
        }catch(error){
            throw (error as any)?.response?.data;
        }
    }

    static async deleteConnection(from_id: number, to_id: number): Promise<void>{
        try{
            await this.axios.delete<void>(`/connections/${from_id}/${to_id}`)
        }catch(error){
            throw (error as any)?.response?.data;
        }
    }

}

export default ConnectionApi