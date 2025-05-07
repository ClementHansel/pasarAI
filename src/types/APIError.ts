export type APIError = {
  status: number;
  code: string;
  message: string;
  errors?: {
    field: string;
    error: string;
  }[];
  accountId?: string;
};
