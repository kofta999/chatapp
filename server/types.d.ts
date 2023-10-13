export interface CustomError extends Error {
  statusCode: number;
}

export interface CustomResponse {
  success: boolean;
  status_message: string;
  data: object | null;
}

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}
