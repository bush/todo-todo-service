import { createServerlessContainer } from "./providers/container";

const c = createServerlessContainer();
const app = c.ServerlessApp;

console.log("calling app.init ...");
const handler = app.init();
console.log("done initializing yo ...");

module.exports.handler = handler;
