import { contactUsPage } from '../pageobjects/contactUsPage';
import invalidEmailData from '../fixtures/invalidEmailData.json';
import invalidPhoneData from '../fixtures/invalidPhoneData.json';

describe('Negative Frontend Validation of Form', () => { 
  before(async () => {
    await contactUsPage.open();
    await contactUsPage.acceptCookies();
  });
  
  beforeEach(async () => {
    await contactUsPage.open();
  });

  describe('Negative Frontend Validation of "Business email" Field', () => {
    invalidEmailData.forEach(({ id, testScenario, input }) => {
      it(`TC-2: ${id} - ${testScenario}: Input "${input}"`, async () => {
        await contactUsPage.fillInvalidEmail(input);
        await expect(contactUsPage.emailErrorMessage).toBeDisplayed();
        await expect(contactUsPage.emailInput).toHaveAttribute(contactUsPage.INVALID_ATTR, 'true');
        await expect(contactUsPage.emailInput).toHaveElementClass(contactUsPage.INVALID_CLASS);
      });
    });
  });

  describe('Negative Frontend Validation of "Phone Number" Field', () => {
    invalidPhoneData.forEach(({ id, testScenario, input }) => {
      it(`TC-1: ${id} - ${testScenario}: Input "${input}"`, async () => {
        await contactUsPage.fillInvalidPhone(input);
        await expect(contactUsPage.phoneErrorMessage).toBeDisplayed();
        await expect(contactUsPage.phoneInput).toHaveAttribute(contactUsPage.INVALID_ATTR, 'true');
        await expect(contactUsPage.phoneInput).toHaveElementClass(contactUsPage.INVALID_CLASS);
      });
    });
  });
});