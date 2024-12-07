import { test, expect } from '@playwright/test';

test('Sauce Demo Login | Click Button', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await page.close();
});

test('Sauce Demo Login | Enter Button', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    const input = page.locator('[data-test="password"]');
    await input.press('Enter');
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await page.close();
});

test('Add to Cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
    await expect(page.getByRole('button', { name: 'REMOVE' })).toBeVisible();
    await page.getByRole('link', { name: '1' }).click();
    await expect(page.getByRole('link', { name: 'Sauce Labs Backpack' })).toBeVisible();
    await page.close();
});

test('Remove from Cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
    await expect(page.getByRole('button', { name: 'REMOVE' })).toBeVisible();
    await page.getByRole('button', { name: 'REMOVE' }).click();
    await expect(page.getByRole('button', { name: 'REMOVE' })).toBeHidden();
    await page.close();
});

test('Burger Menu', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page.getByRole('link', { name: 'Saucelabs' })).toBeVisible();
    await page.close();
});

test('Filter', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await page.getByRole('combobox').selectOption('za');

    // Extract the text content from all cards
    const cardTexts = await page.$$eval('#inventory_container', cards =>
        cards.map(card => card.querySelector('.inventory_item_name')?.textContent?.trim() || '')
    );

    // Sort the extracted text in descending order for the expected result
    const sortedCardTexts = [...cardTexts].sort().reverse();

    // Validate that the cards are sorted in Z to A order
    expect(cardTexts).toEqual(sortedCardTexts);
});

test('New Tab', async ({ page, context }) => {
    await page.goto('https://www.saucedemo.com/v1/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'LOGIN' }).click();

    // Locate and open a product link in a new tab
    const productSelector = 'a#item_4_title_link'; // Replace with your selector
    const [newTab] = await Promise.all([
        context.waitForEvent('page'), // Listen for the new tab
        page.locator(productSelector).first().evaluate((link) => {
            const event = new MouseEvent('click', { bubbles: true, ctrlKey: true }); // Simulate Ctrl + Click
            link.dispatchEvent(event);
        })
    ]);

    // Wait for the new tab to load
    await newTab.waitForLoadState();

    // Validate the product on the new tab
    const productName = await newTab.locator('.inventory_details_name').textContent(); // Replace with the actual selector
    const productPrice = await newTab.locator('.inventory_details_price').textContent(); // Replace with the actual selector

    console.log(`Product Name: ${productName}`);
    console.log(`Product Price: ${productPrice}`);

    // Clean up
    await newTab.close();
    await page.close();
});