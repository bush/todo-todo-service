import createContainer from './providers/container';


// NOTE
// This is only executed on cold starts
const c = createContainer();
const app = c.App;
const handler = app.init();


// NOTE
// We are using the lambdaolith pattern (yes this is a topic for debate)
// but we can still deploy separate lambda functions with this technique.
// In this way we can still use built-in IAM authorizers if needed and
// take advantage of the security features and deployment benefits.
module.exports.todosCreateHandler = async (event: Object, context: Object) => {
  // Add any other logic here

  const result = await handler(event, context);
  return result;
}

module.exports.todosGetAllHandler = async (event: Object, context: Object) => {
    // Add any other logic here

  const result = await handler(event, context);
  return result;
}
