import * as path from 'path';

import Config from './providers/config';
import TodosRouter from './todo/routes';
import Express from './providers/express';
import Http from '../common/express/middleware/http';
import CsrfToken from '../common/express/middleware/http';
import ErrorHandler from '../common/express/middleware/error-handler';

const config = new Config(path.join(process.cwd(),'.env'));
const app = new Express(config);


Http.init(app);
CsrfToken.init(app);
TodosRouter.init(app);
ErrorHandler.init(app);

const server = app.start();
console.log('Server started');

// For testing
export { server };
export default app.express;


