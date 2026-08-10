import { solutionsPage } from '../pageobjects/solutionsPage';
import { faker } from '@faker-js/faker';

describe('Frontend Search Validation on the Solutions page', () => {
  before(async () => {
    await solutionsPage.open();
    await solutionsPage.acceptCookies();
  });

  beforeEach(async () => {
    await solutionsPage.open();
    await expect(solutionsPage.useCaseCardTitles).toBeElementsArrayOfSize({ gte: 1 });
  });

  it('TC-3: Verify successful search of a use case card by exact title', async () => {
    const extractedTitle = await solutionsPage.getFirstCardTitle();
    console.log(`Executing search with: "${extractedTitle}"`);
    await solutionsPage.performSearch(extractedTitle);
    await expect(solutionsPage.useCaseCardTitles).toBeElementsArrayOfSize({ gte: 1 });
    const firstCard = await solutionsPage.useCaseCardTitles[0];
    await expect(firstCard).toBeDisplayed();
    await expect(firstCard).toHaveText(expect.stringContaining(extractedTitle));
  });

  it('TC-15: Verify "No results" message for invalid search query', async () => {
    const invalidQuery = faker.string.uuid(); 
    console.log(`Executing search with invalid query: "${invalidQuery}"`);
    await solutionsPage.performSearch(invalidQuery);
    await solutionsPage.noResultsMessage.waitForDisplayed({ 
        timeout: 5000, 
        timeoutMsg: 'It was expected the message "No results" to appear, but it didnt' 
    });
    await expect(solutionsPage.useCaseCardTitles).toBeElementsArrayOfSize(0);
  });
});