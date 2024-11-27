export interface ApiResponse<T> {
    success: boolean,
    body: T;
    message?: string;
    error?: string;
}