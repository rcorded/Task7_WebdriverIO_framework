import Page from './page';

class SolutionsPage extends Page {
  readonly PAGE_URL = '/solutions';

  get searchInput() { 
    return $('#search, input[type="search"]'); 
  }
  get useCaseCardTitles() { 
    return $$('#use-cases h3.base-heading'); 
  }
  get noResultsMessage() {
    return $('//*[contains(text(), "No results for this filter")]');
  }

  async open() {
    await super.open(this.PAGE_URL);
  }
  async performSearch(query: string) {
    await this.searchInput.waitForDisplayed();
    await this.searchInput.setValue(query);    
    await browser.keys('Enter'); 
  }
  async getFirstCardTitle() {
    const firstCard = await this.useCaseCardTitles[0];
    await firstCard.waitForDisplayed(); 
    const text = await firstCard.getText();
    return text.trim(); 
  }
}

export const solutionsPage = new SolutionsPage();