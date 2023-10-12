interface CustomError extends Error {
  statusCode: number;
}

interface CustomResponse {
  success: boolean;
  status_message: string;
  data: object | null;
}

declare namespace Express {
  export interface Request {
    userId?: string;
  }
}
