export interface ApiResponse<T> {
    success: boolean,
    message?: string;
    body: T;
    error?: string;
}