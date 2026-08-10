import { templatesPage } from '../pageobjects/templatesPage';

describe('Templates Catalog - Dynamic Filter Validation', () => {
  beforeEach(async () => {
    await templatesPage.open();
    await templatesPage.acceptCookies();
  });

  it('TC-12: Verify dynamic industry category filters isolate matching templates', async () => {
    const filtersToTest = await templatesPage.getDynamicFilters();
    console.log(`Dynamic filters extracted for testing: ${filtersToTest.join(', ')}`);
    for (const filterName of filtersToTest) {
      console.log(`--- Testing dynamic filter: "${filterName}" ---`);
      await templatesPage.applyFilter(filterName);
      console.log(`Waiting for the grid to dynamically update with "${filterName}" templates...`);
      await browser.waitUntil(async () => {
        const cards = await templatesPage.getTemplateCards();
        if (cards.length === 0) return false;
        let allMatch = true;
        for (const card of cards) {
          const badgeText = await templatesPage.getCardBadgeText(card);
          if (!badgeText.toLowerCase().includes(filterName.toLowerCase())) {
            allMatch = false;
            break;
          }
        }
        return allMatch;
      }, {
        timeoutMsg: `Grid did not update correctly for filter: ${filterName}`
      });
      const finalCards = await templatesPage.getTemplateCards();
      expect(finalCards.length).toBeGreaterThan(0);
      for (const card of finalCards) {
        const badgeText = await templatesPage.getCardBadgeText(card);
        expect(badgeText.toLowerCase()).toContain(filterName.toLowerCase());
      }
    }
  });
});