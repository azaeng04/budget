import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

globalThis.APP; //?

describe('AppController (e2e)', () => {
  it('/ (GET)', () => {
    return request(globalThis.APP.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
