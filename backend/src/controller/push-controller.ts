import webPush from "web-push";
import { NextFunction, Request, Response } from "express";
import { vapidKeys } from "../main";
import { AuthRequest } from "../middleware/auth-middleware";
import { PushService } from "../service/push-service";

let subscriptions: any = [];

export class PushController {
    constructor() {
        webPush.setVapidDetails(
            "test@gmail.com",
            vapidKeys.publicKey!,
            vapidKeys.privateKey!
        )
    }

    static async subscribe(req: AuthRequest, res: Response, next: NextFunction) {
        const { user_id, subscription } = req.body;

        try {
            const newSubscription = await PushService.subscribe(subscription, user_id);
            res.status(201).json(newSubscription);
        } catch (e) {
            next(e);
        }
    }

    // static sendPushNotification(req: Request, res: Response) {
    //     const notificationPayload = {
    //         title: "New Notification",
    //         body: "This is a new notification",
    //         icon: "https://some-image-url.jpg",
    //         data: {
    //             url: "https://example.com",
    //         }
    //     }

    //     Promise.all(
    //         subscriptions.map((subscription: any) =>
    //             webPush.sendNotification(subscription, JSON.stringify(notificationPayload))
    //         )
    //     )
    //         .then(() => res.status(200).json({ message: "Notification sent successfully." }))
    //         .catch((err) => {
    //             console.error("Error sending notification");
    //             res.sendStatus(500);
    //         });
    // }

    static async sendChatNotification(req: AuthRequest, res: Response, next: NextFunction) {

        const {username, message, room_id, to_id} = req.body;

        // const notificationPayload = {
        //     title: `New message from ${chat.from.username}`,
        //     body: chat.message,
        //     icon: "https://some-image-url.jpg",
        //     data: {
        //         url: `/chat/${chat.room_id}`,
        //     }
        // };

        const notificationPayload = {
            title: `New message from ${username}`,
            body: message,
            icon: "https://some-image-url.jpg",
            data: {
                url: `/chat/${room_id}`,
            }
        };
    
        const subscriptions = await PushService.getSubscriptionsForUser(to_id);
    
        Promise.all(
            subscriptions.map((subscription: any) =>
                webPush.sendNotification(subscription.endpoint, JSON.stringify(notificationPayload))
            )
        )
        .then(() => console.log("Chat notification sent successfully."))
        .catch((err) => {
            console.error("Error sending chat notification", err);
        });
    }

    static async sendNewPostNotification(req: AuthRequest, res: Response, next: NextFunction) {

        const {full_name, username, user_id, content, room_id, to_id} = req.body;

        // const notificationPayload = {
        //     title: `${feed.user.username} has a new post!`,
        //     body: feed.content,
        //     icon: "https://some-image-url.jpg",
        //     data: {
        //         url: `/post/${feed.id}`,
        //     }
        // };

        const notificationPayload = {
            title: `${full_name}(@${username}) has a new post!`,
            body: content,
            icon: "https://some-image-url.jpg",
            data: {
                url: `/profile/${user_id}`,
            }
        };
    
        const connections = await PushService.getConnectionsForUser(user_id);
    
        Promise.all(
            connections.map(async (connection: any) => {
                const subscriptions = await PushService.getSubscriptionsForUser(connection.to_id);
                return Promise.all(
                    subscriptions.map((subscription: any) =>
                        webPush.sendNotification(subscription.endpoint, JSON.stringify(notificationPayload))
                    )
                );
            })
        )
        .then(() => console.log("New post notification sent successfully."))
        .catch((err) => {
            console.error("Error sending new post notification", err);
        });
    }
}


