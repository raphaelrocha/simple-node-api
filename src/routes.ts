import express, { Request, Response } from 'express';
import { testController } from './controllers';

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

//support routes
router.get('/run', handleResponse(testController.run));
export default router;
