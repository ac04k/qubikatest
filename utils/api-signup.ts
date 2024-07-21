import { APIRequestContext, expect } from '@playwright/test';

export async function signUp(request: APIRequestContext, apiBaseUrl: string, email: string, password: string) {
  const response = await request.post(`${apiBaseUrl}/api/auth/register`, {
    data: {
        "email": email,
        "password": password,
        "roles": [
          "ROLE_ADMIN"
        ]
    }
  });

  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('id');
  expect(responseBody.email).toBe(email);
}
