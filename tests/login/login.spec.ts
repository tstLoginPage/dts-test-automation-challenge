import { test, expect } from '@playwright/test';
import { LoginPage } from "@pages/login/login.page";
import { registerUser } from "@datafactory/register";

test.describe('Login Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/auth/login');
    });

    test('Login from homepage sign in link', async ({ page }) => {
        const email = 'customer@practicesoftwaretesting.com';
        const password = 'welcome01';
        const username = 'Jane Doe';

        await page.goto('/');
        await page.getByTestId('nav-sign-in').click();
        await expect(page).toHaveURL(/.*\/auth\/login/);

        const loginPage = new LoginPage(page);
        await loginPage.login(email, password);
 
        await expect(page.getByTestId('nav-menu')).toContainText(username);
        await expect(page.getByTestId('page-title')).toContainText("My account");
    });

    test('Login by direct navigation to login page', async ({ page }) => {
        const email = 'customer2@practicesoftwaretesting.com';
        const password = 'welcome01';
        const username = 'Jack Howe';

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(email, password);

        await expect(page.getByTestId('nav-menu')).toContainText(username);
        await expect(page.getByTestId('page-title')).toContainText("My account");
    });

    test('Login with invalid credentials shows error message', async ({ page }) => {
        const email = 'invalid@example.com';
        const password = 'wrongpassword';

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(email, password);

        await expect(loginPage.loginErrorMessage).toContainText('Invalid email or password');
    });

    test('Login with invalid email shows validation error', async ({ page }) => {
        const email = 'invalid-email-format';
        const password = 'wrongpassword';

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(email, password);
        
        await expect(loginPage.emailInputErrorMessage).toContainText('Email format is invalid');
    });

    test('Login with empty fields shows validation errors', async ({ page }) => {
        const email = '';
        const password = '';

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(email, password);
        
        await expect(loginPage.emailInputErrorMessage).toContainText('Email is required');
        await expect(loginPage.passwordInputErrorMessage).toContainText('Password is required');
    });

    test('Login with newly registered user', async ({ page }) => {
        const email = `test${Date.now()}@test.com`;
        const password = "fjdWEdfs82@";
        
        await registerUser(email, password);

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(email, password);

        await expect(page.getByTestId('nav-menu')).toContainText('Test User');
        await expect(page.getByTestId('page-title')).toContainText("My account");
    });
});