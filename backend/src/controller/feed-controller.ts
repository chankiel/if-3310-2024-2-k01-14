import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth-middleware";
import { CreateFeedRequest, FeedFormat, FeedPagination } from "../model/feed-model";
import { FeedService } from "../service/feed-service";
import { formatResponse } from "../utils/ResponseFormatter";

export class FeedController {
    static async store(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            const request: CreateFeedRequest = req.body as CreateFeedRequest;

            const feeds = await FeedService.add(userId!, request);

            console.log(feeds)

            res.status(200).json({
                feeds
            })
        } catch(e) {
            next(e);
        }
    }

    // static async showFeeds(req: AuthRequest, res: Response, next: NextFunction){
    //     try {
    //         const userId = req.userId;

    //         const feeds_list = await FeedService.getFeed(userId!);

    //         console.log(feeds_list)

    //         const response = formatResponse<FeedFormat[]>(
    //             true,
    //             feeds_list,
    //             "Feed list retrieved successfully!"
    //           );

    //         res.status(200).json(response)

    //     } catch(e) {
    //         next(e);
    //     }
    // }

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

      static async EditFeed(req: AuthRequest, res: Response, next: NextFunction) {
        try {
          const feed_id = Number(req.params.feed_id)
          const request: CreateFeedRequest = req.body as CreateFeedRequest;
          console.log(feed_id)
          console.log(request)
    
          const feed = await FeedService.updateFeed(
            feed_id, request
          );
    
          const response = formatResponse(
            true,
            null,
            `Feed with ${feed_id} updated successfully!`
          );
    
          res.status(200).json(response);
        } catch (e) {
          next(e);
        }
      }


      static async showFeedsPagination(req: AuthRequest, res: Response, next: NextFunction){
        try {
            const userId = req.userId;
            const {cursor, limit} = req.query;
            // console.log(req.query)
            // console.log(cursor)
            // console.log(limit)
 

            const feeds_list = await FeedService.getFeedPagination(userId!, Number(cursor), Number(limit));

            console.log(feeds_list)
            const feed = feeds_list.feeds
            const nextCursor = feeds_list.nextCursor

            const response = formatResponse<FeedPagination>(
                true,
                {cursor: nextCursor, feeds: feed},
                "Feed list retrieved successfully!"
              );

            res.status(200).json(response)

        } catch(e) {
            next(e);
        }
    }
}