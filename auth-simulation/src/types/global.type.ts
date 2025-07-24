export interface ResponseDTO<T = unknown> {
  data: T;
  code: number;
  message: string;
  timestamp: number;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: number;
  details?: string;
  errors?: string[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ResponseDTO<T[]> {
  meta: PaginationMeta;
}
