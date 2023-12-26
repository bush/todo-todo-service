import Express from './providers/express';
import express from 'express';
import Config from './providers/config';
import * as path from 'path';
import logger from '../common/logging/logger';
import TodosRouter from './todo/routes';
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../common/express/middleware/error-handler';
import Http from '../common/express/middleware/http';
import CsrfToken from '../common/express/middleware/http';


// Configure the app
const config = new Config(path.join(process.cwd(),'.env'));
const app = new Express(config);

// Load standard middleware

// Routes and handlers
Http.init(app);
CsrfToken.init(app);
TodosRouter.init(app);
ErrorHandler.init(app);

// Start the app
app.start();