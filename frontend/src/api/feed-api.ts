/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { API_URL } from "../constant";
import {FeedResponse, APIResponse } from "../types";

class FeedApi {
  private static axios = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  static async getFeed(pageParam : number | null , limit = 10) : Promise<FeedResponse>{
    try {
      const response = await this.axios.get<FeedResponse>(
        pageParam
        ? `/feed?cursor=${pageParam}&limit=${limit}`
        : `/feed?limit=${limit}`
      );
      // console.log(response.data.body)
      return response.data;
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async deleteFeed(feed_id: number): Promise<APIResponse> {
    try {
      const res = await this.axios.delete<APIResponse>(`/feed/${feed_id}`);
      return res.data
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

  static async updateFeed(feed_id: number , content:string): Promise<APIResponse> {
    try {
      const res = await this.axios.put<APIResponse>(`/feed/${feed_id}`,{
        body: JSON.stringify({
          content:content,
        }),
      });
      return res.data
    } catch (error) {
      throw (error as any)?.response?.data;
    }
  }

//   static async getFeedPagination({ pageParam = null, limit = 10 }) : Promise<FeedFormat[]>{
//     try {
//       const response = await this.axios.get<FeedResponse>(
//         `/feed`, {
//           params: {
//             cursor: pageParam,
//             limit: limit,
//           },
//         }
//       );
//       console.log(response.data.body)
//       return response.data.body;
//     } catch (error) {
//       throw (error as any)?.response?.data;
//     }
//   }
  
}





export default FeedApi;
