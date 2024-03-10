import { createServerlessContainer } from './providers/container';

const c = createServerlessContainer();
const app = c.ServerlessApp;
module.exports.handler = app.init();