# Qubika Sports Club Management System - Test Automation

## Project Description

The goal of this project was to automate the given workflow following best automation and Playwright practices. I used the Page Object Model (POM) to organize the locators and separated the API calls into different files. At the end of the tests, the categories are deleted (using APIs) to keep the database clean. The URLs were added as environmental variables using dotenv.

## Possible Improvements and Comments

- **User Deletion**: As an improvement, given that the workflow includes creating a new user, the user created during the test should be deleted at the end of the test. The goal is to delete everything created during the test run to keep the database clean. Given that deleting the user was not possible with the provided UI and APIs, each email uses a timestamp to be able to create a new account on each run.
  
- **Credential Management**: Credentials and sensitive information should be added to the `.env` file, and this file should be stored locally and not included in the online repository.

- **Environment Configuration**: The project could be configured to run in different environments by using different .env files and Playwright settings.

- **Use of BeforeAll/BeforeEach and AfterAll/AfterEach**: If more tests are added to the suite, we could make use of `BeforeAll`/`BeforeEach` sections for the sign-up and log-in portions, and `AfterAll`/`AfterEach` sections to clean the data created.

- **Parallel Testing**: The current implementation does not support parallel execution of tests. To enhance the test suite, the existing test should be adjusted.

## Instructions for Running the Tests

To run the tests in headless mode, you can use:
```bash
npx playwright test
```

Or you can use the following command to run the tests with the interactive UI:
```bash
npx playwright test --ui
```
