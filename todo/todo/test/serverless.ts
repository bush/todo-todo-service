import { describe } from "mocha";
import { createServerlessContainer } from '../../providers/container';

describe("Todos", () => {
  it("The application should initialize", (done) => {
    const c = createServerlessContainer();
    const app = c.ServerlessApp;
    app.init();
    done();
  });
});