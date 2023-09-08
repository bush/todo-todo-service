import express, { Request, Response } from 'express';

const router = express.Router();
export default router;


router.get('/', (req: Request, res: Response) => {
  res.json({
    msg: 'Api up and running!'
  });
});