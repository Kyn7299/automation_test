# Playwright Test Automation

This project is an end-to-end (E2E) automation testing framework built using [Playwright](https://playwright.dev/) with TypeScript. It follows the Page Object Model (POM) structure to ensure maintainability and scalability.

## Prerequisites

- **Node.js** (v14 or higher)
- **NPM** (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository/playwright-automation.git
   cd playwright-automation
   ```

2. Install dependencies:

   ```bash
   npm install
   ``` 

3. Install the required browsers:

   ```bash
   npx playwright install
   ```

- The environment variables in `.env.example` is required for success execution.

```bash
BASE_URL="https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
USERNAME = 
PASSWORD = 
```

## Running Tests

1. Run all tests:

   ```bash
   npx playwright test
   ```

2. View test report:

   ```bash
   npx playwright show-report
   ```

## Technologies Used

- Playwright – Modern E2E testing framework supporting Chromium, Firefox, and WebKit.
- TypeScript – Strongly typed language for better code quality.
- Page Object Model (POM) – For structured and reusable test logic.

## Folder & File Descriptions

| Path/Folder              | Description                                         |
|--------------------------|-----------------------------------------------------|
| `enums/`                 | Centralized enums for data and messages             |
| `helpers/envHelper.ts`   | Helper for managing environment variables           |
| `pages/`                 | Page classes encapsulating UI operations            |
| `tests/*.spec.ts`        | Test cases written using Playwright's test runner   |
| `utils/utils.ts`         | Shared utility functions                            |
| `playwright.config.ts`   | Configuration file for Playwright                   |
| `.env`                   | Environment configuration (e.g. base URL, credentials) |

## Example Test

```ts
test('Successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('username', 'password');
  await expect(page).toHaveURL('/dashboard');
});
```

## Contact
For any questions or issues, feel free to reach out to me via email