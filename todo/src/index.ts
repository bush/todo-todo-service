import createContainer from './providers/container';

const c = createContainer();
const app = c.App;

app.init();
app.start();