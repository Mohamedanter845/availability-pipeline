const request = require('supertest');
const app = require('../server');

describe('Smoke test', () => {
  test('GET / should return HTML', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Team Availability/);
  });
});
