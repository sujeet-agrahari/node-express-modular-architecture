/* eslint-disable no-unused-expressions */
const test = require('ava');
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire');
const app = require('../src/app');

test.before(async (t) => {
  const sendOtpStub = sinon.stub().resolves({});
  proxyquire('../src/components/auth/auth.module', {
    './otp.service': {
      doSendOtp: sendOtpStub,
    },
  });
  t.context.stubs = {
    sendOtpStub,
  };
  t.context.baseUrl = '/api/v1/auth';
  t.context.server = request(app);
});

test.after.always((t) => {
  delete require.cache[require.resolve('../src/app')]; // kills
});

test.serial('Send OTP', async (t) => {
  const { server, baseUrl, stubs } = t.context;
  const response = await server.get(`${baseUrl}/send-otp?phone=8576863491`)
    .expect(200);
  expect(stubs.sendOtpStub.calledOnce).to.be.true;
  expect(response).to.be.a('Object');
});

// test.serial('Login', async (t) => {

// })
