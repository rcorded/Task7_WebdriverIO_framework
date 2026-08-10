import Page from './page.js';

class TemplatesPage extends Page{
  readonly PAGE_URL = '/templates';

  get filterButtons() {
    return $$('//span[contains(@class, "typography-cta") and contains(text(), "Filter by industry:")]/..//button');
  }

  async getTemplateCards() {
    return await $$('#templates a[href*="/templates/"]').filter(card => card.isDisplayed());
  }
  async open() {
    await super.open(this.PAGE_URL);
  }
  async applyFilter(filterName: string) {
    let attempts = 0;
    let currentUrl = await browser.getUrl();
    const initialUrl = currentUrl;
    while (attempts < 3) {
      const buttons = await this.filterButtons;
      let targetButton: WebdriverIO.Element | undefined;
      for (const btn of buttons) {
        const text = await btn.getText();
        if (text.toLowerCase().includes(filterName.toLowerCase())) {
          targetButton = btn;
          break;
        }
      }
      if (!targetButton) {
        throw new Error(`Filter button containing text "${filterName}" was not found.`);
      }
      await targetButton.click();
      await browser.pause(1000);
      currentUrl = await browser.getUrl();
      if (currentUrl !== initialUrl) {
        console.log(`The "${filterName}" filter has been successfully applied.`);
        return this;
      }
      console.log(`Dead click on "${filterName}". Trying again... (Attempt ${attempts + 1})`);
      attempts++;
    }
    throw new Error(`The "${filterName}" filter could not be applied (the URL did not change) after 3 attempts.`);
  }
  async getDynamicFilters(): Promise<string[]> {    
    const texts = await this.filterButtons.map(button => button.getText());    
    return texts.map(text => text.trim()).slice(0, texts.length - 1);
  }
  async getCardBadgeText(cardElement: WebdriverIO.Element): Promise<string> {
    const badge = await cardElement.$('strong.typography-heading2-category, strong.bg-citron');
    return badge.getText();
  }
}

export const templatesPage = new TemplatesPage();