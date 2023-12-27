import chai from 'chai';
import chaiHttp from 'chai-http';
import { v4 as uuidv4 } from 'uuid';
import { describe } from 'mocha';

import app, { server } from '../../index';
import express, { Application } from 'express';

chai.use(chaiHttp);
chai.should();


describe('Todos', () => {
  describe('POST /api/v1/todos', () => {
    after(() => {
      server.close();
    });
    
    it('should create a todo', (done) => {
      chai
        .request(app)
        .post('/api/v1/todos')
        .send({
          id: uuidv4(),
          note: 'Test todo description',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});

