const test = require('ava');
const request = require('supertest');
const sinon = require('sinon');
const faker = require('faker');

require('dotenv').config();

// dependency to be stubbed
const Middleware = require('../src/middlewares');

// stubs
const authStub = sinon.stub(Middleware, 'auth').callsFake((req, res, next) => {
  req.user = {};
  req.user.id = faker.random.number(999999999);
  next();
});

const app = require('../src/app');

test.before(async (t) => {
  t.context.stubs = {
    authStub,
  };
  t.context.baseUrl = '/api/v1/auth';
  t.context.server = request(app);
});

test.after.always((t) => {
  delete require.cache[require.resolve('../src/app')]; // kills server
});

test.skip('Login User', async (t) => {
  const { server, baseUrl, stubs } = t.context;
  const res = await server
    .post(`${baseUrl}/login`)
    .send({
      phone: '8576863491',
      otp: faker.random.number(9999),
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  t.true(stubs.doVerifyOtpStub.called);
  t.true(typeof res === 'object');
});

test.skip('Register User', async (t) => {
  const { server, baseUrl, stubs } = t.context;
  const phoneNumber = faker.phone.phoneNumber('78########');
  const res = await server
    .post(`${baseUrl}/register`)
    .send({
      phone: phoneNumber,
      otp: 5896,
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  t.true(stubs.doVerifyOtpStub.called);
  t.true(typeof res === 'object');
});

