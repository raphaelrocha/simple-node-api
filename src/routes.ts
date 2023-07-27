import express, { Request, Response } from 'express';
import { converterController } from './controllers/ConverterController';
import fs from 'fs';

const router = express.Router();

const handleResponse = (handle: any) => async (req: Request, res: Response) => {
  try {
    const { userId, body, query, params }: any = req;
    const resultHandle = await handle({ userId, body, query, params });
    res.status(200).json(resultHandle);
  } catch (error: any) {
    if (error.code && error.message) {
      return res.status(error.code).json(error.message);
    } else {
      return res.status(500).json(String(error));
    }
  }
};

const handleResponseFileMp3 =
  (handle: any) => async (req: Request, res: Response) => {
    try {
      const { userId, body, query, params }: any = req;
      const resultHandle = await handle({ userId, body, query, params });

      const stat = fs.statSync(resultHandle);

      res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': stat.size,
      });

      console.log('PATH to stream', resultHandle);

      const readStream = fs.createReadStream(resultHandle);
      readStream.pipe(res);
    } catch (error: any) {
      if (error.code && error.message) {
        return res.status(422).send(error.message);
      } else {
        return res.status(500).send(String(error));
      }
    }
  };

//support routes
router.get('/run', handleResponseFileMp3(converterController.converter));
export default router;
