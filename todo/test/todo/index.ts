import chai from 'chai';
import chaiHttp from 'chai-http';
import { v4 as uuidv4 } from 'uuid';
import { describe } from 'mocha';

import app, { server } from '../../index';
import logger from '../../../common/logging/logger';

logger.use('null');
chai.use(chaiHttp);
chai.should();

describe('Todos', () => {


  describe('POST /api/v1/todos', () => {
    after(() => {
      server.close();
    });
    
    it('Should create a todo', (done) => {
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

    it('Should create a duplicate todo', (done) => {
      const id = uuidv4();
      chai
        .request(app)
        .post('/api/v1/todos')
        .send({
          id,
          note: 'Test todo description',
        }).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
        })
        
        chai
        .request(app)
        .post('/api/v1/todos')
        .send({
          id,
          note: 'Test todo description',
        }).end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          done();
        })
    });
  });
});

