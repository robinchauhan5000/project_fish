
import { Request, Response, NextFunction } from 'express';

export const adaptRoute = (handler: (req: Request, res: Response) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res).catch(next);
  };
};
