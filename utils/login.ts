import { Page, expect } from '@playwright/test';

export async function login(page: Page, username: string, password: string): Promise<void> {
    await page.goto('https://www.saucedemo.com/v1/');
    await page.locator('[data-test="username"]').fill(username);
    await page.locator('[data-test="password"]').fill(password);
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
}