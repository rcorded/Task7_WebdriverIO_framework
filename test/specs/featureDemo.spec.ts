import { featureDemoPage, WIDGET_TABS } from '../pageobjects/featureDemoPage';

describe('Feature Demo Widget - State Management', () => {
  before(async () => {
    await featureDemoPage.open();
    await featureDemoPage.acceptCookies();
  });

  beforeEach(async () => {
    await featureDemoPage.open();
  });

  it('TC-5: Local Context Preservation Upon Tab Switching', async () => {
    const testMessage = 'My secret test message';    
    await expect(featureDemoPage.chatInput).toHaveValue('');
    const lastModelText = await featureDemoPage.selectLastModel();
    await featureDemoPage.typeMessage(testMessage);
    await featureDemoPage.switchTab(WIDGET_TABS.VOICE_AGENT);    
    await expect(featureDemoPage.chatInput).not.toBeExisting();
    await featureDemoPage.switchTab(WIDGET_TABS.INFERENCE);    
    const activeModelButton = await featureDemoPage.getModelButtonByName(lastModelText);
    await expect(activeModelButton).toHaveAttribute('aria-pressed', 'true');
    await expect(featureDemoPage.chatInput).toHaveValue(testMessage);
  });

  it('TC-6: Verify the system prevents sending an empty message', async () => {
    await featureDemoPage.selectLastModel();
    console.log('Step 1: Click the SEND MESSAGE button with an empty input');
    await expect(featureDemoPage.chatInput).toHaveValue('');
    await featureDemoPage.clickSendMessage();
    console.log('Expected Result 1: Error message is visible and request is blocked');
    await expect(featureDemoPage.errorMessage).toBeDisplayed();
    console.log('Step 2: Enter whitespace and click the SEND MESSAGE button again');
    await featureDemoPage.typeMessage('    ');
    await featureDemoPage.clickSendMessage();
    console.log('Expected Result 2: Error message is visible for whitespace only');
    await expect(featureDemoPage.errorMessage).toBeDisplayed();
  });

  it('TC-7: Verify selecting different AI models updates the active highlight state', async () => {
    console.log('Step 1: Observe the default selected model');    
    const defaultActiveCards = await featureDemoPage.modelCards.filter(async (card) => 
      await card.getAttribute('aria-pressed') === 'true'
    );
    expect(defaultActiveCards.length).toBe(1);
    console.log('Step 2: Click on each option in the list and verify states');
    const cards = await featureDemoPage.modelCards;
    const totalModels = await cards.length;
    for (let index = 0; index < totalModels; index++) {
      const button = cards[index];
      await button.click();
      console.log(`Expected Result 1: Model at index ${index} receives active state`);
      await expect(button).toHaveAttribute('aria-pressed', 'true');
      console.log('Expected Result 2 & 3: Only one model is visually active, others revert to unhighlighted');
      const currentActiveCards = await featureDemoPage.modelCards.filter(async (card) => 
        await card.getAttribute('aria-pressed') === 'true'
      );
      const currentInactiveCards = await featureDemoPage.modelCards.filter(async (card) => 
        await card.getAttribute('aria-pressed') === 'false'
      );
      expect(currentActiveCards.length).toBe(1);
      expect(currentInactiveCards.length).toBe(totalModels - 1);
    }
  });
});