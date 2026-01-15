import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/auth/login');
    });

    test('Login from homepage navigates to login page', async ({ page }) => {
        const email = 'customer@practicesoftwaretesting.com';
        const password = 'welcome01';
        const username = 'Jane Doe';

        await page.goto('/');
        await page.getByTestId('nav-sign-in').click();
        await expect(page).toHaveURL(/.*\/auth\/login/);
        await page.getByTestId('email').fill(email);
        await page.getByTestId('password').fill(password);
        await page.getByTestId('login-submit').click();
        await expect(page.getByTestId('nav-menu')).toContainText(username);
        await expect(page.getByTestId('page-title')).toContainText("My account");
    });
});