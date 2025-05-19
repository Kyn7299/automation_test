import { Locator, Page } from '@playwright/test';

export class SearchPage {
  private page: Page;

  searchInput: Locator;
  listItems: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = this.page.getByPlaceholder("Search");
    this.listItems = this.page.locator('ul.oxd-main-menu > li');
  }

  async searchData(data: string){
    await this.searchInput.fill(data);
  }
}
