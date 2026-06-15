import { test as base, expect } from '@playwright/test';
import GaragePage from '../../src/pages/GaragePage';

type Fixtures = {
  userGaragePage: GaragePage;
};

export const test = base.extend<Fixtures>({
  storageState: 'playwright/.auth/user.json',

  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);

    await garagePage.open();
    await use(garagePage);
  },
});

export { expect };
