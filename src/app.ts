import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import httpError from 'http-errors';
import Logger from './utils/Logger';
import authRouter from './routes/AuthRouter';
import productsRouter from './routes/ProductsRouter';
import rolesRouter from './routes/RolesRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router definition
app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/roles', rolesRouter);

// catch 404 error
app.use((_req, res, next) => {
  next(httpError.NotFound());
});

/* Error handler needs 4 params, include the unused-vars "_next" */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (httpError.isHttpError(err)) {
    res.status(err.status).json(err);
  } else {
    Logger.error('Unhandled error', err);
    res.status(500).json(httpError.InternalServerError());
  }
});

export default app;
