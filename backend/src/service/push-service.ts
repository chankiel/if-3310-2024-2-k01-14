import { resourceUsage } from "process";
import { prismaClient } from "../application/database";
import { CreatePushRequest } from "../model/push-model";
import { PushValidation } from "../validation/push-validation";
import { Validation } from "../validation/validation";

export class PushService {

    static async subscribe(request: CreatePushRequest, user_id: number) {
        const pushRequest = Validation.validate(
            PushValidation.CREATE_PUSH_REQUEST,
            request
        );

        try {

            const totalUserSameEndpoint = await prismaClient.pushSubscription.count({
                where: {
                    endpoint: request.endpoint,
                },
            });

            console.log("Jumlah", totalUserSameEndpoint)

            if (totalUserSameEndpoint == 0) {
                const newSubscription = await prismaClient.pushSubscription.create({
                    data: {
                        endpoint: pushRequest.endpoint,
                        keys: pushRequest.keys,
                        user_id: user_id,
                    },
                });

                console.log("New Subscription added: ", newSubscription);
                return newSubscription;
            }
        } catch (error) {
            console.error("Error inserting subscription: ", error);
            throw new Error("Failed to insert subscription");
        }
    }

    static async getSubscriptionsForUser(user_id: number) {
        console.log("cari: ", user_id)
        return await prismaClient.pushSubscription.findMany({
            where: {
                user_id: user_id
            }
        });
    }

    static async getConnectionsForUser(user_id: number) {
        const connections = await prismaClient.connection.findMany({
            where: {
                from_id: user_id
            },
            include: {
                to: true
            }
        });
        return connections;
    }

    static async removeSubscriptions(invalidSubscriptions: Array<{ endpoint: string; keys: { auth: string; p256dh: string } }>) {
        const endpoints = invalidSubscriptions.map(sub => sub.endpoint);

        await prismaClient.pushSubscription.deleteMany({
            where: {
                endpoint: {
                    in: endpoints,
                },
            },
        });
    }

    static async getUrlPhoto(user_id: number) {
        const urls = await prismaClient.user.findUnique({
            where: {
                id: user_id
            },
            select: {
                profile_photo_path: true
            }
        });

        return urls;
    }

}