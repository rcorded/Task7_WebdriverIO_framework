import Page from './page';

class HomePage extends Page {
  readonly PAGE_URL = '/';

  async open() {
    await super.open(this.PAGE_URL);
  }
}

export const homePage = new HomePage();