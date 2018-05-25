import 'mocha';
import { expect } from 'chai';
import * as request from 'supertest';
import Server from '../server';

describe('users', () => {
  it('should get all users', () =>
    request(Server)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .of.length(2);
      }));

  it('should add a new users', () =>
    request(Server)
      .post('/api/v1/users')
      .send({
        name: 'Rahul Barua',
        username: 'rahul',
        email: 'rahuliation@gmail.com',
        password: '123'
      })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('Rahul Barua');
      }));

  it('should get an example by id', () =>
    request(Server)
      .get('/api/v1/users/5b07c701724ba712d07289ca')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('Rahul Barua');
      }));
});
