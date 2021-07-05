declare namespace Express {
  export interface Request {
    serviceLocator: any;
    userId: number;
    role: string;
  }
}
