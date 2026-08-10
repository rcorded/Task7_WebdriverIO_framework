import Page from './page.js';

export const WIDGET_TABS = {
  INFERENCE: 'Inference',
  VOICE_AGENT: 'Voice Agent Builder',
} as const;

class FeatureDemoPage extends Page {
  readonly PAGE_URL = '/';

  get inferenceTab() { 
    return $(`button[role="tab"]*=${WIDGET_TABS.INFERENCE}`);
  }
  get voiceAgentTab() { 
    return $(`button[role="tab"]*=${WIDGET_TABS.VOICE_AGENT}`);
  }
  get modelCards() {
    return $$('//span[contains(text(), "CHOOSE MODEL")]/ancestor::div[contains(@class, "bg-cream")]//button[@aria-pressed]');
  }
  get chatInput() { 
    return $('[placeholder="Type message here"]'); 
  }
  get sendMessageButton() {
    return $('button*=SEND MESSAGE');
  }
  get errorMessage() {
    return $('span=Please enter a message');
  }

  async open() {
    await super.open(this.PAGE_URL);
  }
  async switchTab(tabName: typeof WIDGET_TABS[keyof typeof WIDGET_TABS]) {
    if (tabName === WIDGET_TABS.INFERENCE) {
      await this.inferenceTab.click();
    } else if (tabName === WIDGET_TABS.VOICE_AGENT) {
      await this.voiceAgentTab.click();
    }
  }
  async selectLastModel() {
    const cards = await this.modelCards;
    const lastCard = cards[await cards.length - 1];
    await lastCard.click();
    const rawText = await lastCard.getText();
    return rawText.trim();
  }
  async typeMessage(message: string) {
    await this.chatInput.setValue(message);
  }
  async clickSendMessage() {
    await this.sendMessageButton.click();
  }
  getModelButtonByName(modelName: string) {
    return $(`button*=${modelName}`);
  }
}

export const featureDemoPage = new FeatureDemoPage();