import Page from "./page";

class ContactUsPage extends Page {
  readonly PAGE_URL = '/contact-us';
  readonly INVALID_ATTR = 'aria-invalid';
  readonly INVALID_CLASS = 'mktoInvalid';

  get emailInput() { return $('#Email, input[type="email"]'); }
  get emailErrorMessage() { return $('#ValidMsgEmail'); }
  get phoneInput() {
    return $('#Phone_Number_Base__c, input[name="Phone_Number_Base__c"]');
  }
  get phoneErrorMessage() {
    return $('#ValidMsgPhone_Number_Base__c, div[role="alert"][id*="Phone_Number"]');
  }

  async open() {
      await super.open(this.PAGE_URL);
  }
  async fillInvalidEmail(email: string) {
    const input = await this.emailInput;
    await input.click();
    if (email) {
      await input.setValue(email);
    }
    await browser.keys('Tab');
    await input.click();
    return this;
  }
  async fillInvalidPhone(phone: string) {
    const input = await this.phoneInput;
    await input.click();
    if (phone) {
      await input.setValue(phone);
    }
    await browser.keys('Tab');
    await input.click();
    return this;
  }
}

export const contactUsPage = new ContactUsPage();