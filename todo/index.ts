import NimkeeExpressApp from "../common/express/express";
import createContainer from './providers/container';
import { IMiddlewareProvider } from './providers/middleware';
import { ITodoProvider } from "./providers/todo";
import { IAppProvider } from "./providers/app";


const c = createContainer();


const httpMiddleware = (c as IMiddlewareProvider).HttpMiddleware;
const todoRouter = (c as ITodoProvider).TodoRouter;
const app = (c as IAppProvider).App as NimkeeExpressApp;


// Middleware
httpMiddleware.init();

// Routers
todoRouter.init();

// Start
app.start();
