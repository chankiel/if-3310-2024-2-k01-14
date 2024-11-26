import { ApiResponse } from '../model/custom';

export const formatResponse = <T>(
  success: boolean,
  body: T,
  message?: string,
  error?: string
): ApiResponse<T> => {
  return {
    success,
    message,
    body,
    error,
  };
};
