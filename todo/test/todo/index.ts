import chai from "chai";
import path from "path";
import chaiHttp from "chai-http";
import { v4 as uuidv4 } from "uuid";
import { describe } from "mocha";

import logger from "../../../common/logging/logger";

import App from "../../../common/express/express";
import Config from "../../providers/config";
import Http from "../../../common/express/middleware/http";
import DatabaseFactory  from "../../../common/database/database-factory"; 
import TodoRepoFactory from "../../todo/repo-factory";
import TodoController from "../../todo/controller";
import TodoRouter from "../../todo/routes";


logger.off();
chai.use(chaiHttp);
chai.should();

describe("Todos", () => {
  describe("POST /api/v1/todos", () => {
    const config = new Config(path.join(process.cwd(),'.env')).load();
    const app = new App();
    const dbFactory = new DatabaseFactory();
    const todoRepo = new TodoRepoFactory(dbFactory).create("electrodb");
    const todoController = new TodoController(todoRepo);
    const todoRouter = new TodoRouter(todoController);

    const httpMiddleware = new Http({
      maxUploadLimit: config.maxUploadLimit,
      maxParameterLimit: 10,
    });

    app.use(httpMiddleware);
    app.use(todoRouter);
    const express = app.express;
    const server = app.start();

    after(() => {
      server.close();
    });

    it("Should create a todo", (done) => {
      chai
        .request(app.express)
        .post("/api/v1/todos")
        .send({
          id: uuidv4(),
          note: "Test todo description",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("Should create a duplicate todo", (done) => {
      const id = uuidv4();
      chai
        .request(app.express)
        .post("/api/v1/todos")
        .send({
          id,
          note: "Test todo description",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
        });

      chai
        .request(app.express)
        .post("/api/v1/todos")
        .send({
          id,
          note: "Test todo description",
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
