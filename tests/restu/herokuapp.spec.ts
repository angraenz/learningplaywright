import { test, expect } from '@playwright/test';

test('Checkboxes', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Checkboxes' }).click();
    await page.getByRole('checkbox').first().check();
    await expect(page.getByRole('checkbox').first()).toBeChecked();
    await page.close();
});

test('File Download', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'File Download', exact: true }).click();
    const file = await page.getByRole('link', { name: 'manoj.m.docx' });
    // await page.getByRole('link', { name: 'manoj.m.docx' }).click();

    // Wait for the download event
    const [download] = await Promise.all([
        page.waitForEvent('download'), // Wait for the download event
        page.click('file') // Replace with the selector triggering the download
    ]);

    // Save the downloaded file to a custom location
    const suggestedFilename = download.suggestedFilename(); // Filename suggested by the server
    const filePath = `downloads/${suggestedFilename}`; // Customize your download path

    await download.saveAs(filePath); // Save the file
    console.log(`File downloaded to: ${filePath}`);

    // Add assertions if necessary
    const fileExists = require('fs').existsSync(filePath);
    expect(fileExists).toBeTruthy();

    await page.close();
});

test('Hovers', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Hovers' }).click();
    await page.getByRole('img', { name: 'User Avatar' }).nth(2).hover();
    await expect(page.getByRole('heading', { name: 'name: user3' })).toBeVisible();
    await page.close();
});

test('Frames', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Frames', exact: true }).click();
    await page.getByRole('link', { name: 'Nested Frames' }).click();
    await expect(page.locator('frame[name="frame-top"]').contentFrame().locator('frame[name="frame-right"]').contentFrame().getByText('RIGHT')).toBeVisible();
    await page.close();
});