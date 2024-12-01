import webPush from "web-push";
import { Request, Response } from "express";

export class PushController {
    constructor() {
        webPush.setVapidDetails(
            'mailto:example@domain.org',
            'VAPID_PUBLIC_KEY',
            'VAPID_PRIVATE_KEY'
        )
    }
    
    static subscribe(req: Request, res: Response) {
        const subscription = req.body;
        // Store subscription in the database
        // Associate it with the user
        res.status(201).json({});
    }
    
    static sendPushNotification(req: Request, res: Response) {
        const { subscription, data } = req.body;

        const pushSubscription: webPush.PushSubscription = {
            endpoint: subscription.endpoint,
            keys: {
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth
            }
        };

        webPush.sendNotification(pushSubscription, JSON.stringify(data))
            .then(() => {
                res.status(200).json({ message: 'Notification sent' });
            })
            .catch(error => {
                console.error('Error sending notification, reason: ', error);
                res.status(500).json({ error: 'Failed to send notification' });
            });
    }
}


