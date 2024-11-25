/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import Cookies from "js-cookie"

import { API_URL } from "../constant";
import { ConnectionResponse } from "../types";

class ConnectionApi{
    private static token = Cookies.get("token") || "";
    private static axios = axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        }
    });

    static async getConnections(user_id: string): Promise<ConnectionResponse[]>{
        try{
            const response = await this.axios.get<ConnectionResponse[]>(`/connections/${user_id}`)

            return response.data
        }catch(error){
            throw (error as any)?.response?.data;
        }
    }

    static async getPendingRequests(user_id: number ): Promise<ConnectionResponse[]>{
        try{
            const response = await this.axios.get<ConnectionResponse[]>(`/connection-request/${user_id}/pending`)

            return response.data
        }catch(error){
            throw (error as any)?.response?.data;
        }
    }

}

export default ConnectionApi