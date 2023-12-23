import Config from './providers/config';
import express, { Request, Response, NextFunction, Router } from 'express';
import * as path from 'path';


import todo from './todo/routes'

const port = new Config().load(path.join(__dirname,'.env')).port;
console.log(`port: ${port}`);
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
