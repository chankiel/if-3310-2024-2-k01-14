export interface ApiResponse<T> {
    success: boolean,
    body: T;
    message?: string;
    body: T;
    error?: string;
}