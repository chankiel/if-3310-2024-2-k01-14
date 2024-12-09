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
    static async add(id: number, request: CreateFeedRequest): Promise<any> {
        const addRequest = Validation.validate(
            FeedValidation.ADD,
            request
        )

        const addFeed = await prismaClient.feed.create({
            data: {
                content: request.content,
                user_id: id,
                updated_at: new Date(),
            },
        });

        const newFeedUpdated = await prismaClient.feed.findUnique({
          where : {id : addFeed.id},
          include: {
            user: {
              select: {
                id: true,
                username: true,
                full_name: true,
                profile_photo_path:true,
              },
            },
          },
        })

        console.log(newFeedUpdated)

        

        return newFeedUpdated;
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
      const isFeedAvailable = await prismaClient.feed.findUnique({
        where:{id:id}
      })

      if (!isFeedAvailable) {
        throw ("Feed with the specified id doesn't exist!")
      }

      const feed = await prismaClient.feed.delete({
        where: {
          id: id,
        },
      });
      return feed;
    }

    static async updateFeed(id: number, request: CreateFeedRequest) {
      const isFeedAvailable = await prismaClient.feed.findUnique({
        where:{id:id}
      })

      if (!isFeedAvailable) {
        throw ("Feed with the specified id doesn't exist!")
      }

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
      // console.log(cursor)
      // console.log(limit)
      const feeds = await prismaClient.feed.findMany({
        where: {
          OR: [
            { user_id: id }, // Feed dari diri sendiri
            {
              user_id: {
                in: await prismaClient.connection.findMany({
                  where: {
                    OR: [
                      { from_id: id }, // Pengguna yang terhubung dengan diri sendiri
                      { to_id: id }, // Pengguna yang terhubung dengan diri sendiri
                    ],
                  },
                  select: {
                    from_id: true,
                    to_id: true,
                  },
                }).then(connections => 
                  connections.flatMap(c => [c.from_id, c.to_id])
                ), // Ambil semua ID pengguna yang terhubung
              },
            },
          ],
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
          include: {
            user: { // Gabungkan dengan data pengguna
              select: {
                id: true,
                username: true,
                full_name: true,
                profile_photo_path:true,
              },
            },
          },
      });
      // Determine next cursor
      const nextCursor = feeds.length === limit ? feeds[feeds.length - 1].id : null;
      return {nextCursor, feeds};
    }

    
}