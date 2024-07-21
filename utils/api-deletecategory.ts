import { APIRequestContext, expect } from '@playwright/test';

export async function deleteCategory(request: APIRequestContext, apiBaseUrl: string, categoryName: string, token: string) {
  const response = await request.post(`${apiBaseUrl}/api/category-type/search`, {
    headers: {
        'Authorization': `Bearer ${token}`
      },
    data: {
        "name": categoryName,
        "root": true
    }
  });

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  const categoryId = responseBody.content[0].id;

  const deleteResponse = await request.delete(`${apiBaseUrl}/api/category-type/delete/${categoryId}`, {
    headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    expect(deleteResponse.status()).toBe(200);
}
