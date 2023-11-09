import Express from './providers/express';
import Config from './providers/config';
import * as path from 'path';
import logger from '../../common/logging/logger';

//logger.use('winston');
const config = new Config().load(path.join(process.cwd(),'.env'));
const app = new Express(config);
app.useStandardMiddleware();
app.loadDatabase();
app.start(config.port);