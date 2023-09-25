import Locals from './providers/locals';
import express, { Request, Response, NextFunction, Router } from 'express';

import todo from './routes/todo'

const port: number = Locals.config().port;
console.log(port);

const app = express();

app.use("/", todo);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  if(err) {
    res.status(err.status || 500).json({
      msg: err.message || 'Error'
    }); 
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
