export type FeedFormat = {
    id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
    user : {
        id: number;
        username: string;
        full_name: string | null;
        profile_photo_path: string | null;
    }
}

export type CreateFeedRequest = {
    content: string;
}

export type FeedPagination = {
    cursor : number | null;
    feeds : FeedFormat[];
}