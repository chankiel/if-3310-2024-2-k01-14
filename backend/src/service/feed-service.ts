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

    
}