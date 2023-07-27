import 'dotenv/config';
import dotenvSafe from 'dotenv-safe';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import http from 'http';

dotenvSafe.config();

const myLogger = function (req: Request, res: Response, next: NextFunction) {
  console.log('request');
  console.log(req.url);
  console.log('- - - - - - - - - - - - - - -');
  next();
};

// App
const app = express();

// Set port
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(myLogger);
app.use('/', routes);

const httpServer = http.createServer(app);

httpServer.listen(port, () =>
  console.log(`Server running on localhost:${port}`),
);
