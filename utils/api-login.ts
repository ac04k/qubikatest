import { APIRequestContext, expect } from '@playwright/test';

export async function logIn(request: APIRequestContext, apiBaseUrl: string, email: string, password: string) {
  const response = await request.post(`${apiBaseUrl}/api/auth/login`, {
    data: {
        "email": email,
        "password": password
    }
  });

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  return responseBody.token;
}
