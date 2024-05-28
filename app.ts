import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import productsRouter from './src/routes/ProductRouter';
import httpError from 'http-errors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router definition
app.use('/products', productsRouter);

// catch 404 error
app.use((_req, res, next) => {
  next(httpError.NotFound());
});

/* Error handler needs 4 params, include the unused-vars "_next" */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  if (httpError.isHttpError(err)) {
    res.status(err.status).json(err);
  } else {
    res.status(500).json(httpError.InternalServerError());
  }
});

export default app;
