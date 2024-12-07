import { test, expect } from '@playwright/test';
// import { faker } from '@faker-js/faker';
import { faker } from '@faker-js/faker/locale/id_ID';

function generateCouponCode() {
    const prefix = "COUPON"; // Optional prefix
    const randomCode = faker.string.alphanumeric(10).toUpperCase(); // Generates a 10-character alphanumeric code

    return `${prefix}-${randomCode}`;
}

test('test', async ({ page }) => {
    const fakeEmail = faker.internet.email(); 
    const fakePassword = faker.internet.password();
    const fakeName = faker.internet.displayName();   
    // const fakeDescription = faker.lorem.paragraph();
    const fakeDescription = faker.location.streetAddress();
    const couponCode = generateCouponCode();

    await page.goto('https://example.cypress.io/commands/actions');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(fakeEmail);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(fakePassword);
    await page.getByPlaceholder('Enter your name').click();
    await page.getByPlaceholder('Enter your name').fill(fakeName);
    await page.getByLabel('Describe:').click();
    await page.getByLabel('Describe:').fill(fakeDescription);
    await page.getByLabel('Coupon Code').click();
    await page.getByLabel('Coupon Code').fill(couponCode);
});