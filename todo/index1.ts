import Express from './providers/express';
import Config from './providers/config';
import * as path from 'path';
import logger from '../common/logging/logger';

const config = new Config().load(path.join(process.cwd(),'.env'));
const expressApp = new Express(config);
expressApp.useStandardMiddleware();
expressApp.loadDatabase();
expressApp.start(config.port);