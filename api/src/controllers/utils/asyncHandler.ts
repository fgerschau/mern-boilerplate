import { Request, Response, NextFunction } from 'express';

type IRequestHandler<T> = (req: Request, res: Response, next: NextFunction) => T;

export const expressAsyncHandler = (fn: IRequestHandler<Promise<any>>): IRequestHandler<any> =>
  function (req, res, next) {
    fn(req, res, next).catch(next);
  };
