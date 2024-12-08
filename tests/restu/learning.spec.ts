import { test, expect } from '@playwright/test';

test('Open Visual Studio Website', async ({ page }) => {
  await page.goto('https://www.google.com/?hl=en');
  await page.getByLabel('Search', { exact: true }).click();
  await page.getByLabel('Search', { exact: true }).fill('visual studio code');
  await page.goto('https://www.google.com/search?q=visual+studio&sca_esv=92c281187b2f1d14&hl=en&source=hp&ei=_oBGZ4OWOLGV4-EP2_TcwQc&iflsig=AL9hbdgAAAAAZ0aPDl7bylQhwxNZonRik2aTVdzjCzOX&ved=0ahUKEwiDjcfuuPuJAxWxyjgGHVs6N3gQ4dUDCA4&uact=5&oq=visual+studio&gs_lp=Egdnd3Mtd2l6Ig12aXN1YWwgc3R1ZGlvMgcQABiABBgTMgcQABiABBgTMgcQABiABBgTMgcQABiABBgTMgcQABiABBgTMgcQABiABBgTMgcQABiABBgTMgcQABiABBgTMgcQABiABBgTMgcQABiABBgTSJ00UK4ZWJIucAF4AJABAJgBQ6ABigaqAQIxM7gBA8gBAPgBAZgCDqACzAaoAgrCAgoQABgDGOoCGI8BwgIKEC4YAxjqAhiPAZgDC5IHAjE0oAeyQg&sclient=gws-wiz');
  await page.getByRole('link', { name: 'Visual Studio Code - Code' }).click();
  // await page.getByRole('heading', { name: 'Code faster with AI' }).click();
  await expect(page.getByRole('heading', { name: 'Code faster with AI' })).toBeVisible();
});