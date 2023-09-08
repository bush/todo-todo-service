import express, { Request, Response, NextFunction, Router } from 'express';

import router from './router'

const port = process.env.PORT || 3030;

const app = express();

app.use("/", router)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  if(err) {
    res.status(err.status || 500).json({
      msg: err.message || 'Error'
    }); 
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
