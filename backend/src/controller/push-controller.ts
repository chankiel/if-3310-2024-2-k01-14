import webPush from "web-push";
import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../middleware/auth-middleware";
import { PushService } from "../service/push-service";

const vapidKeys = {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY
}

webPush.setVapidDetails(
    "mailto:francescokusuma15@gmail.com",
    vapidKeys.publicKey!,
    vapidKeys.privateKey!
)

export class PushController {

    static async subscribe(req: AuthRequest, res: Response, next: NextFunction) {
        const { user_id, subscription } = req.body;

        try {
            const newSubscription = await PushService.subscribe(subscription, user_id);
            res.status(201).json(newSubscription);
        } catch (e) {
            next(e);
        }
    }

    static async sendChatNotification(req: AuthRequest, res: Response, next: NextFunction) {
        const { full_name, message, room_id, to_id } = req.body;

        const notificationPayload = {
            title: `New message from ${full_name}`,
            body: message,
            icon: "https://some-image-url.jpg",
            data: {
                url: `/chat/${room_id}`,
            }
        };

        try {
            const userSubscriptions = await PushService.getSubscriptionsForUser(to_id);

            console.log("Target user: ", userSubscriptions);

            const formattedSubscriptions = userSubscriptions.map((target) => {
                const keys = target.keys as { auth: string; p256dh: string };
                return {
                    endpoint: target.endpoint,
                    keys: {
                        auth: keys.auth,
                        p256dh: keys.p256dh,
                    },
                };
            });

            console.log("Format: ", formattedSubscriptions);

            const validSubscriptions: Array<{ endpoint: string; keys: { auth: string; p256dh: string } }> = [];
            const invalidSubscriptions: Array<{ endpoint: string; keys: { auth: string; p256dh: string } }> = [];

            for (const subscription of formattedSubscriptions) {
                try {
                    await webPush.sendNotification(subscription, JSON.stringify(notificationPayload));
                    validSubscriptions.push(subscription);
                } catch (error: any) {
                    console.log("Error code: ", error)
                    if (error.statusCode === 404 || error.statusCode === 401) {
                        console.log("invalid")
                        invalidSubscriptions.push(subscription);
                    }
                }
            }

            console.log("AW1");

            if (invalidSubscriptions.length > 0) {
                await PushService.removeSubscriptions(invalidSubscriptions);
                console.log("Removed invalid subscriptions:", invalidSubscriptions);
            }

            console.log("Valid subscriptions to send notifications:", validSubscriptions);

            await Promise.all(
                validSubscriptions.map(async (subscription) => {
                    try {
                        await webPush.sendNotification(subscription, JSON.stringify(notificationPayload));
                        console.log("Success: ", subscription)
                    } catch (error) {
                        console.log("Error sini")
                        console.error("Error sending notification to subscription:", subscription.endpoint, error);
                    }
                })
            );

            console.log("Chat notification sent successfully.");
            res.status(200).json({ message: "Chat notification sent successfully." });
        } catch (err) {
            console.error("Error sending chat notification", err);
            res.status(500).json({ message: "Error sending chat notification." });
        }
    }

    static async sendNewPostNotification(req: AuthRequest, res: Response, next: NextFunction) {

        const { full_name, username, user_id, content } = req.body;

        const notificationPayload = {
            title: `${full_name}(@${username}) has a new post!`,
            body: content,
            icon: "https://some-image-url.jpg",
            data: {
                url: `/profile/${user_id}`,
            }
        };

        try {
            const connections = await PushService.getConnectionsForUser(user_id);
            const validSubscriptions: Array<{ endpoint: string; keys: { auth: string; p256dh: string } }> = [];
            const invalidSubscriptions: Array<{ endpoint: string; keys: { auth: string; p256dh: string } }> = [];

            for (const connection of connections) {
                const subscriptions = await PushService.getSubscriptionsForUser(connection.to_id);

                for (const subscription of subscriptions) {
                    const keys = subscription.keys as { auth: string; p256dh: string };
                    const formattedSubscription = {
                        endpoint: subscription.endpoint,
                        keys: {
                            auth: keys.auth,
                            p256dh: keys.p256dh,
                        },
                    };

                    try {
                        await webPush.sendNotification(formattedSubscription, JSON.stringify(notificationPayload));
                        validSubscriptions.push(formattedSubscription);
                    } catch (error: any) {
                        if (error.statusCode === 404 || error.statusCode === 410) {
                            invalidSubscriptions.push(formattedSubscription);
                        }
                    }
                }
            }

            if (invalidSubscriptions.length > 0) {
                await PushService.removeSubscriptions(invalidSubscriptions);
                console.log("Removed invalid subscriptions:", invalidSubscriptions);
            }

            await Promise.all(
                validSubscriptions.map(async (subscription) => {
                    try {
                        await webPush.sendNotification(subscription, JSON.stringify(notificationPayload));
                        console.log("Success: ", subscription)
                    } catch (error) {
                        console.log("Error sini")
                        console.error("Error sending notification to subscription:", subscription.endpoint, error);
                    }
                })
            );

            console.log("New post notification sent successfully.");
            res.status(200).json({ message: "New post notification sent successfully." });
        } catch (err) {
            console.error("Error sending new post notification", err);
            res.status(500).json({ message: "Error sending new post notification." });
        }
    }
}


