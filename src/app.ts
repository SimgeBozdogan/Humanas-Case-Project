import 'express-async-errors';
import express, { Express, Request, Response, NextFunction } from 'express';
import profileRouter from './routes/Profile/profile.route';
import { ErrorService } from './services/ErrorService';

export function createApp(): Express {
  const app = express();
  app.use(express.json());
  app.use(profileRouter);

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ErrorService) {
      res.status(err.status).json({ error: err.message, details: err.details });
      return;
    }
    console.error(err);
    res.status(500).json({ error: 'Something went wrong on our side.' });
  });

  return app;
}