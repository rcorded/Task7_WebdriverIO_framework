import Page from './page.js';

class InferencePricingPage extends Page {
  readonly PAGE_URL = '/pricing/inference-api';
  
  get currencyDropdown() { 
    return $('button#currency-filter[role="combobox"]'); 
  }
  get mainContentArea() {
    return $('#pay-as-you-go');
  }
  
  async open() {
    await super.open(this.PAGE_URL);
  }
  async getActiveCurrency(): Promise<string> {
    await browser.waitUntil(
      async () => (await this.currencyDropdown.getText()).trim() !== '',
      { timeoutMsg: 'Currency dropdown text was empty' }
    );
    const text = await this.currencyDropdown.getText();
    return text.trim(); 
  }
  async selectCurrency(targetCurrency: string) {
    await this.currencyDropdown.click();    
    const option = $(`//*[@role="option"][contains(., "${targetCurrency}")]`);
    await option.click();
  }
  async extractAllPrices() {
    const rawText = await this.mainContentArea.getText();
    const priceRegex = /([$€])\s*(\d+(?:\.\d+)?)/g;
    const matches = [...rawText.matchAll(priceRegex)];
    const parsedData = matches.map((match) => ({
      symbol: match[1],         
      price: parseFloat(match[2])
    }));
    return parsedData;
  }
}

export const inferencePricingPage = new InferencePricingPage();