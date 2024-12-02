export type FeedFormat = {
    id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
}

export type CreateFeedRequest = {
    content: string;
}