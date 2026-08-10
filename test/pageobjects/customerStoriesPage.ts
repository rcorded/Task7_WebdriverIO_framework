import Page from './page.js';

class CustomerStoriesPage extends Page {
  readonly PAGE_URL = '/customer-stories';

  get industryDropdown() {
    return $('//*[contains(text(), "Industry")]/..//*[@role="combobox"]');
  }
  get dropdownOptions() {
    return $$('[data-radix-popper-content-wrapper] [role="option"], [role="option"]');
  }
  get clearFiltersLink() {
    return $('button.text-green.cursor-pointer');
  }

  async open() {
    await super.open(this.PAGE_URL);
  }
  async clickClearFilters() {
    await this.clearFiltersLink.click();
  }
  getCustomerStoryCards() {
    return $$('a[href*="/customer-stories/"]');
  }
  async getCardBadgeText(cardElement: WebdriverIO.Element): Promise<string> {
    const badge = await cardElement.$('span.bg-black');
    return badge.getText();
  }
  async openIndustryDropdown() {
    await this.industryDropdown.click();
  }
  async closeDropdown() {
    await browser.keys('Escape');
  }
  async selectIndustryOption(option: string) {
    const optionElement = await $(`[role="option"]*=${option}`);
    await optionElement.click();
  }
  async applyIndustryFilter(filterName: string) {
    const originalUrl = await browser.getUrl();
    await this.openIndustryDropdown();
    await this.selectIndustryOption(filterName);
    await expect(browser).not.toHaveUrl(originalUrl);
  }
  async getTopIndustryFilters(skipCount: number = 0, takeCount: number = 3): Promise<string[]> {
    await this.openIndustryDropdown();
    const options = await this.dropdownOptions;
    const filters: string[] = [];
    const limit = Math.min(skipCount + takeCount, await options.length);
    for (let i = skipCount; i < limit; i++) {
      const text = await options[i].getText();
      filters.push(text.trim());
    }
    await this.closeDropdown();
    return filters;
  }

  async checkAllCardsMatchFilterSync(filterName: string): Promise<boolean> {
    return await browser.execute((textToMatch) => {
      const cards = document.querySelectorAll('a[href*="/customer-stories/"]');
      if (cards.length === 0) return false; 
      for (let i = 0; i < cards.length; i++) {
        const badge = cards[i].querySelector('span.bg-black');
        if (!badge) return false;
        const badgeText = (badge as HTMLElement).innerText.toLowerCase();
        if (!badgeText.includes(textToMatch.toLowerCase())) {
          return false; 
        }
      }      
      return true; 
    }, filterName); 
  }
}

export const customerStoriesPage = new CustomerStoriesPage();