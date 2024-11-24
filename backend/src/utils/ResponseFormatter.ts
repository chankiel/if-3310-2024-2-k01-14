import { ApiResponse } from '../model/custom';

export const formatResponse = <T>(
  success: boolean,
  data: T,
  message?: string,
  error?: string
): ApiResponse<T> => {
  return {
    success,
    data,
    message,
    error,
  };
};
