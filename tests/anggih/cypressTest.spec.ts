import { test, expect } from '@playwright/test';
//import { faker } from '@faker-js/faker';
import { faker } from '@faker-js/faker/locale/id_ID';
//import { fakerID_ID } from '@faker-js/faker';

test('test', async ({ page }) => {
    const fakeEmail = faker.internet.email();
    const fakePass = faker.internet.password();
    const fakeName = faker.person.fullName();
    const fakeDesc = faker.word.words();
    const fakeCoupon = faker.word.words();
    //const FakerID = fakerID_ID;

  await page.goto('https://example.cypress.io/commands/actions');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(fakeEmail);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(fakePass);
  await page.getByPlaceholder('Enter your name').click();
  await page.getByPlaceholder('Enter your name').fill(fakeName);
  await page.getByLabel('Describe:').click();
  await page.getByLabel('Describe:').fill(fakeDesc);
  await page.getByLabel('Coupon Code').click();
  await page.getByLabel('Coupon Code').fill(fakeCoupon);
});