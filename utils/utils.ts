import { Page } from '@playwright/test';

// Get the system platform of the browser
export async function getPlatform(page: Page): Promise<string> {
  return await page.evaluate(() => navigator.platform);
}

// Allow paste data from the clipboard to somewhere
export async function pasteDataFromClipboard(page: Page, data: string): Promise<void> {
  await page.evaluate((data) => {
    navigator.clipboard.writeText(data);
  }, data);

  const platform = await getPlatform(page);
  if (platform === "MacIntel") {
    await page.keyboard.press('Meta+V');
  } else {
    await page.keyboard.press('Control+V');
  } 
}
