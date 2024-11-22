import { FeedResponse } from "./feed-model";

export type UserResponse = {
    success: boolean;
    message: string;
    body?: {
        token?: string;
        username?: string;
        description?: string;
        photo_profile?: string;
        relevant_posts?: FeedResponse[];
    }
    error?: string;
}

export type CreateUserRequest = {
    username: string;
    email: string;
    password: string;
}

export type LoginUserRequest = {
    email: string;
    password: string;
}

export type UpdateUserRequest = {
    username?: string;
    description?: string;
    photo_profile?: string;
}

export function toUserResponse(message: string, token?: string): UserResponse{
    return {
        success: true,
        message: message,
        body: {
            token: token
        }
    }
}

export function toGetUserProfileResponse(message: string, username: string, description: string, photo_profile: string, relevantPosts: any[]): UserResponse{
    return {
        success: true,
        message: message,
        body: {
            username: username,
            description: description,
            photo_profile: photo_profile,
            relevant_posts: relevantPosts
        }
    }
}

export function toGetUserUpdateProfileResponse(message: string): UserResponse{
    return {
        success: true,
        message: message
    }
}