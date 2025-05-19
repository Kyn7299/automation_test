import { test, expect, type Page } from '@playwright/test';
import { getBaseUrl, getPassword, getUsername } from '../helpers/envHelper';
import { DataInput } from '../enums/dataInput.enum';
import { SearchPage } from '../pages/searchPage';
import { LoginPage } from '../pages/loginPage';

test.beforeEach(async ({ page }) => {
  const baseUrl = getBaseUrl();
  await page.goto(baseUrl);

  const loginPage = new LoginPage(page);  
  await loginPage.login(getUsername(), getPassword());
  await loginPage.upgradeBtn.waitFor({state: 'visible'})
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('Search feature', () => {
  test('TC_001: Search with exact keyword', async ({ page }) => {
    const searchPage = new SearchPage(page);  

    await searchPage.searchData(DataInput.EXACT_KEY)

    expect(await searchPage.listItems.count(), "Verify that only one result is displayed").toEqual(1);
    expect(await searchPage.listItems.first().innerText(), "Verify that the result is equal with the search key").toBe(DataInput.EXACT_KEY); 
  });

  test('TC_002: Search with partial keyword', async ({ page }) => {
    const searchPage = new SearchPage(page);  

    await searchPage.searchData(DataInput.PARTIAL_KEY)
    const itemCount = await searchPage.listItems.count();

    expect(itemCount, "Verify that have at least one result").toBeGreaterThan(1);
    for (let i = 0; i < itemCount; i++) {
      const listItemText = await searchPage.listItems.nth(i).innerText();
      expect(listItemText.toLowerCase(), "Verify that the result contains the search key").toContain(DataInput.PARTIAL_KEY); 
    }
  });

  test('TC_003: Search with lowercase letters', async ({ page }) => {
    const searchPage = new SearchPage(page);  

    await searchPage.searchData(DataInput.EXACT_KEY.toString().toLowerCase());

    expect(await searchPage.listItems.count(), "Verify that only one result is displayed").toEqual(1);
    expect(await searchPage.listItems.first().innerText(), "Verify that the result is equal with the search key").toBe(DataInput.EXACT_KEY);
  });

  test('TC_004: Search with uppercase letters', async ({ page }) => {
    const searchPage = new SearchPage(page);  

    await searchPage.searchData(DataInput.EXACT_KEY.toString().toUpperCase());

    expect(await searchPage.listItems.count(), "Verify that only one result is displayed").toEqual(1);
    expect(await searchPage.listItems.first().innerText(), "Verify that the result is equal with the search key").toBe(DataInput.EXACT_KEY);
  });

  test('TC_005: Search with invalid keyword', async ({ page }) => {
    const searchPage = new SearchPage(page);  

    await searchPage.searchData(DataInput.INVALID_KEY);

    expect(await searchPage.listItems.count(), "Verify that no result is displayed").toEqual(0);
  });

  test('TC_006: Search with special characters', async ({ page }) => {
    const searchPage = new SearchPage(page);  

    await searchPage.searchData(DataInput.SPECIAL_KEY);

    expect(await searchPage.listItems.count(), "Verify that no result is displayed").toEqual(0);
  });

  test('TC_007: Search with empty input', async ({ page }) => {
    const searchPage = new SearchPage(page);  

    await searchPage.searchData(DataInput.EMPTY_KEY);

    expect(await searchPage.listItems.count(), "Verify that all the result still remain").toBeGreaterThan(0);
  });
});