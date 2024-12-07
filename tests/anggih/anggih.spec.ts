import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByLabel('Cari').click();
  await page.getByLabel('Cari').fill('playwright tutorial');
  await page.goto('https://www.google.com/search?q=playwright+tutorial&sca_esv=2ba1e0c14cc8627a&source=hp&ei=bi9HZ9yJC-S8seMPsb2-kAc&iflsig=AL9hbdgAAAAAZ0c9fvVtmNxDjs_9wTCOoAFp6PhpodDy&ved=0ahUKEwjc-Oub3_yJAxVkXmwGHbGeD3IQ4dUDCA4&uact=5&oq=playwright+tutorial&gs_lp=Egdnd3Mtd2l6IhNwbGF5d3JpZ2h0IHR1dG9yaWFsMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHkj3IlDMBVi0IHABeACQAQGYAesDoAHXI6oBCTIuNC4zLjUuM7gBA8gBAPgBAZgCEaACsyKoAgrCAgoQABgDGOoCGI8BwgIIEAAYgAQYsQPCAgsQABiABBixAxiDAcICDhAuGIAEGMcBGI4FGK8BwgILEC4YgAQYsQMYgwHCAgsQLhiABBjHARivAZgDIpIHCTIuNS4zLjMuNKAH82k&sclient=gws-wiz');
  await page.getByRole('link', { name: 'Playwright: Fast and reliable' }).click();
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
});