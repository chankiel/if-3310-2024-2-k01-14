import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth-middleware";
import { CreateFeedRequest, FeedFormat } from "../model/feed-model";
import { FeedService } from "../service/feed-service";
import { formatResponse } from "../utils/ResponseFormatter";

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

    static async showFeeds(req: AuthRequest, res: Response, next: NextFunction){
        try {
            const userId = req.userId;

            const feeds_list = await FeedService.getFeed(userId!);

            console.log(feeds_list)

            const response = formatResponse<FeedFormat[]>(
                true,
                feeds_list,
                "Feed list retrieved successfully!"
              );

            res.status(200).json(response)

        } catch(e) {
            next(e);
        }
    }

    static async deleteFeed(req: AuthRequest, res: Response, next: NextFunction) {
        try {
          const feed_id = Number(req.params.feed_id)
          console.log(feed_id)
    
          const feed = await FeedService.deleteFeed(
            feed_id
          );
    
          const response = formatResponse(
            true,
            null,
            `Feed with ${feed_id} deleted successfully!`
          );
    
          res.status(200).json(response);
        } catch (e) {
          next(e);
        }
      }
}