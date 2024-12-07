export type CreatePushRequest = {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
};