import { inferencePricingPage } from '../pageobjects/inferencePricingPage';
import currencyData from '../fixtures/currencyData.json';

describe('Dynamic Currency Conversion Validation Across All Tables', () => {
  beforeEach(async () => {
    await inferencePricingPage.open();
    await inferencePricingPage.acceptCookies();
    await expect(inferencePricingPage.currencyDropdown).toBeDisplayed();
  });

  currencyData.forEach(({ id, scenario, targetCurrency, expectedSymbol, regexPattern }) => {
    it(`TC-4: ${id} - ${scenario}`, async function () {      
      const baseCurrency = await inferencePricingPage.getActiveCurrency();
      console.log(`${id} ${baseCurrency}`);
      if (baseCurrency === targetCurrency) {
        console.log(`[Skipped] The target currency (${targetCurrency}) is already active.`);
        this.skip();
      }
      const basePrices = await inferencePricingPage.extractAllPrices();
      expect(basePrices.length).toBeGreaterThan(0);
      await inferencePricingPage.selectCurrency(targetCurrency);      
      const contentText = await inferencePricingPage.mainContentArea.getText();
      expect(contentText).toContain(expectedSymbol);
      const newPrices = await inferencePricingPage.extractAllPrices();            
      expect(newPrices.length).toBe(basePrices.length);
      newPrices.forEach((newItem, index) => {
        const baseItem = basePrices[index];
        expect(newItem.symbol).toBe(expectedSymbol);
        expect(newItem.symbol).not.toBe(baseItem.symbol);
        expect(newItem.price).not.toBe(baseItem.price);
        const regex = new RegExp(regexPattern);
        expect(newItem.price.toString()).toMatch(regex);
      });
    });  
  });
});