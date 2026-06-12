import { Page } from '@playwright/test';

export default class BasePage {
  page: Page;
  url: string;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
  }

  async open() {
    await this.page.goto(this.url);
  }
}
