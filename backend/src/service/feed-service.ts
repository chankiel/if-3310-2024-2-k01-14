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
}