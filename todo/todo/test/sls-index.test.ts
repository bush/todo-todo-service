import { describe } from "mocha";
import createContainer from '../../providers/container';

describe("Todos", () => {
  it("The application should initialize", (done) => {
    const c = createContainer();
    const app = c.App;
    app.init();
    done();
  });
});
