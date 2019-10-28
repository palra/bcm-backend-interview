import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/routes/:airline_code/:from/:to (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/routes/AF/CDG/JFK/')
      .expect(200);
  });

  it('/api/routes/:airline_code/:from/:to (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/routes/AF/CDG/NOPE/')
      .expect(400);
  });

  it('/api/routes/:airline_code/:from/:to (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/routes/NOPE/CDG/JFK/')
      .expect(400);
  });
});
