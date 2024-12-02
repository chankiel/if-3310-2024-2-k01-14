import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth-middleware";
import { CreateFeedRequest } from "../model/feed-model";
import { FeedService } from "../service/feed-service";

export class FeedController {
    static async store(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            const request: CreateFeedRequest = req.body as CreateFeedRequest;

            const feed = await FeedService.add(userId!, request);

            console.log(feed)

            res.status(200).json({
                feed
            })
        } catch(e) {
            next(e);
        }
    }
}