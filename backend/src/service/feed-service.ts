import { CreateFeedRequest } from "../model/feed-model";
import { FeedValidation } from "../validation/feed-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";

export const prismaFeedFormat = {
    id: true,
    content: true,
    user_id: true,
}

export class FeedService {
    static async add(id: number, request: CreateFeedRequest): Promise<string> {
        const addRequest = Validation.validate(
            FeedValidation.ADD,
            request
        )

        const newFeed = await prismaClient.feed.create({
            data: {
                content: request.content,
                user_id: id,
                updated_at: new Date(),
            },
        });

        return "Feed added successfully.";
    }

    static async getFeed(id: number) {
            const feeds = await prismaClient.feed.findMany({
                where: {
                    user_id: id,
                  },
                orderBy: {
                    created_at: 'desc',
                },
            });
        return feeds;
    }

    static async deleteFeed(id : number) {
        const feed = await prismaClient.feed.delete({
          where: {
            id: id,
          },
        });
        return feed;
      }

      static async updateFeed(id: number, request: CreateFeedRequest) {
        const feed = await prismaClient.feed.update({
            where: { id },
            data: { 
                content: request.content,
                updated_at: new Date(), 
            },
          });
        return feed;
      }

      static async getFeedPagination(id: number, cursor:number ,limit:number) {
        console.log(cursor)
        console.log(limit)
        const feeds = await prismaClient.feed.findMany({
            where: {
                user_id: id,
              },
            orderBy: [
              {
                created_at: "desc"
              },
              {
                id: "desc"
              }
            ],
            take:limit,
            skip: cursor ? 1 : 0, // Lewati 1 data jika cursor diberikan
            cursor: cursor ? { id: cursor } : undefined, // Mulai dari cursor ID jika 
        });
        // Determine next cursor
        const nextCursor = feeds.length === limit ? feeds[feeds.length - 1].id : null;
        return {nextCursor, feeds};
      }

    
}