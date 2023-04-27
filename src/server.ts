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

const responseMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const send = res.send;
  res.send = function (body?: any) {
    console.log('response');
    console.log('request params');
    console.log(req.params);
    console.log('request body');
    console.log(req.body);
    console.log('result body');
    if (req.is('application/json') && typeof body === 'object') {
      body = JSON.parse(body);
      delete body['firebaseUid'];
      send.call(this, JSON.stringify(body));
    } else {
      send.call(this, body);
    }
    console.log(body);
    console.log('- - - - - - - - - - - - - - -');
    return res;
  };
  next();
};

// App
const app = express();

// Set port
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(myLogger);
app.use(responseMiddleware);
app.use('/', routes);

const httpServer = http.createServer(app);

httpServer.listen(port, () =>
  console.log(`Server running on localhost:${port}`),
);
