import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import { CategoryTypesPage } from '../pages/category-types-page';
import { signUp } from '../utils/api-signup';
import { logIn } from '../utils/api-login';
import { deleteCategory } from '../utils/api-deletecategory';
import { generateTimestamp } from '../utils/timestamp';

const timestamp = generateTimestamp();
let loginPage: LoginPage;
let homePage: HomePage;
let categoryTypesPage: CategoryTypesPage;


test('create sub category e2e flow', async ({ request, page }) => {

    // Arrange
    const apiBaseUrl = process.env.API_BASE_URL;
    if (!apiBaseUrl) {
        throw new Error('API_BASE_URL environment variable is not set');
    }
    const appBaseUrl = process.env.BASE_URL;
    if (!appBaseUrl) {
        throw new Error('BASE_URL environment variable is not set');
    }
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    categoryTypesPage = new CategoryTypesPage(page);
    const email = `ac+${timestamp}@test.com`;
    const password = '12345678';
    const categoryName = 'CategoryTestName1!';
    const subCategoryName = '0#SubcategoryTestName';

    // Sign up
    await signUp(request, apiBaseUrl, email, password);
    
    // Go to login page
    await page.goto(`${appBaseUrl}/#/auth/login`);
    await expect(page).toHaveTitle("Qubika Club");
    await loginPage.fillFields(email, password);
    await loginPage.clickAuthenticate();

    // Validate successful login
    await expect(page).toHaveURL('/#/dashboard');
    await homePage.validateHomePageVisibility();

    // Create a new category
    await homePage.goToCategoryTypes();
    await categoryTypesPage.clickAddCategory();
    await categoryTypesPage.assertModalIsVisible();
    await categoryTypesPage.addCategoryName(categoryName)
    await categoryTypesPage.clickAcceptButton();
    await categoryTypesPage.assertModalIsHidden();

    // Validate that the category was created succesfully
    await categoryTypesPage.validateLastCategory(categoryName, "");

    // Create a new subcategory
    await categoryTypesPage.clickAddCategory();
    await categoryTypesPage.assertModalIsVisible();
    await categoryTypesPage.addCategoryName(subCategoryName)
    await categoryTypesPage.addParentCategory(categoryName);
    await categoryTypesPage.clickAcceptButton();
    await categoryTypesPage.assertModalIsHidden();

    // Validate that the subcategory was created succesfully
    await categoryTypesPage.validateLastCategory(subCategoryName, categoryName);

    // Delete the categories we just created using the API
    const token = await logIn(request, apiBaseUrl, email, password);
    await deleteCategory(request, apiBaseUrl, subCategoryName, token);
    await deleteCategory(request, apiBaseUrl, categoryName, token);
})
