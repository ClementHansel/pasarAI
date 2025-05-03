export interface UserRequest extends Request {
  user?: {
    id: string;
    role?: string;
  };
}
