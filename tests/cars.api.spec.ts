import { test, expect } from './fixtures/userGaragePage.fixture';

test.describe('/api/cars POST', () => {
  test('creates a car with valid data', async ({ request }) => {
    const car = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 100,
    };

    const response = await request.post('/api/cars', {
      data: car,
    });
    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.status).toBe('ok');
    expect(body.data.carBrandId).toBe(car.carBrandId);
    expect(body.data.carModelId).toBe(car.carModelId);
    expect(body.data.mileage).toBe(car.mileage);
  });

  test('does not create a car without car brand id', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: {
        carModelId: 1,
        mileage: 100,
      },
    });
    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.status).toBe('error');
  });

  test('does not create a car with negative mileage', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: -1,
      },
    });
    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.status).toBe('error');
  });
});
