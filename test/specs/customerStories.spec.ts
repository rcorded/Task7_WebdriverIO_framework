import { customerStoriesPage } from '../pageobjects/customerStoriesPage.js';

describe('Customer Stories - Data-Driven Dropdown Filter Validation', () => {
  before(async () => {
    await customerStoriesPage.open();
    await customerStoriesPage.acceptCookies();
  });

  beforeEach(async () => {
    await customerStoriesPage.open();
  });

  it('TC-13: Dynamically extract and verify the first 3 Industry filters', async () => {
    const filtersToTest = await customerStoriesPage.getTopIndustryFilters(0, 3);
    console.log(`Dynamic filters extracted for testing: ${filtersToTest.join(', ')}`);
    for (const filterName of filtersToTest) {
      console.log(`--- Testing dynamic filter: "${filterName}" ---`);
      await customerStoriesPage.applyIndustryFilter(filterName);
      console.log(`Waiting for the grid to dynamically update with "${filterName}" cards...`);
    await browser.waitUntil(async () => {
        return await customerStoriesPage.checkAllCardsMatchFilterSync(filterName);
      }, { 
        timeoutMsg: `Grid did not update completely for filter: "${filterName}"` 
      });
      const cards = await customerStoriesPage.getCustomerStoryCards();
      expect(cards.length).toBeGreaterThan(0); 
      for (const card of cards) {
        const badgeText = await customerStoriesPage.getCardBadgeText(card);
        expect(badgeText.toLowerCase()).toContain(filterName.toLowerCase());
      }
    }
  });

it('TC-14: Verify "Clear filters" resets the grid to its default state', async () => {
    const filters = await customerStoriesPage.getTopIndustryFilters(0, 1);
    const firstFilter = filters[0];
    console.log(`Step 1: Applying the first filter: "${firstFilter}"`);
    await customerStoriesPage.applyIndustryFilter(firstFilter);    
    await browser.waitUntil(async () => {
      return await customerStoriesPage.checkAllCardsMatchFilterSync(firstFilter);
    }, { timeoutMsg: `Grid did not update completely for filter: "${firstFilter}"` });
    const filteredCards = await customerStoriesPage.getCustomerStoryCards();
    const filteredCount = filteredCards.length;
    console.log(`Count of cards with filter applied: ${filteredCount}`);
    await customerStoriesPage.clearFiltersLink.waitForDisplayed();
    await expect(customerStoriesPage.clearFiltersLink).toBeDisplayed();
    console.log('Step 2: Clicking the "Clear filters" link');
    await customerStoriesPage.clickClearFilters();
    await browser.waitUntil(async () => {
      const newCards = await customerStoriesPage.getCustomerStoryCards();
      return newCards.length >= filteredCount;
    }, { timeoutMsg: 'Cards count did not reset' });
    await expect(customerStoriesPage.industryDropdown).toHaveText(
      expect.stringContaining('All industries')
    );    
    await customerStoriesPage.clearFiltersLink.waitForDisplayed({ reverse: true });
    await expect(customerStoriesPage.clearFiltersLink).not.toExist();
  });
});