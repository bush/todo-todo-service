import createContainer from './providers/container';

const c = createContainer();
const httpMiddleware = c.HttpMiddleware;
const todoRouter = c.TodoRouter;
const app = c.App;

httpMiddleware.init();
todoRouter.init();
app.start();
