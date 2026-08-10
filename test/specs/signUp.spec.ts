import { faker } from '@faker-js/faker';
import { signUpPage } from '../pageobjects/signUpPage';
import passwordValidationTests from '../fixtures/passwordValidation.json';

describe('Registration / Sign-Up Validation', () => {
  before(async () => {
    await signUpPage.open();
    await signUpPage.acceptCookies();
  });

  beforeEach(async () => {
    await signUpPage.open(); 
  });

  it('TC-8: Negative Sign-Up: Empty mandatory fields and unaccepted terms validation', async () => {    
    console.log('Click the SIGNUP button with empty fields');
    await signUpPage.clickSignUp();    
    await expect(browser).toHaveUrl(expect.stringContaining(signUpPage.PAGE_URL));
    console.log('Verify Email field turns red and shows error');
    await expect(signUpPage.emailInput).toHaveAttribute('aria-invalid', 'true');  
    await expect(signUpPage.emailError).toBeDisplayed(); 
    console.log('Verify Password field turns red and shows error');
    await expect(signUpPage.passwordInput).toHaveAttribute('aria-invalid', 'true'); 
    await expect(signUpPage.passwordError).toBeDisplayed();
    console.log('Verify Terms checkbox shows error');
    await expect(signUpPage.termsCheckbox).toHaveAttribute('aria-invalid', 'true'); 
    await expect(signUpPage.termsError).toBeDisplayed();
  });

  passwordValidationTests.forEach((data) => {    
    it(`${data.tcId}: Negative Sign-Up: ${data.description}`, async () => {
      const randomEmail = faker.internet.email();
      console.log(`Step: Fill email (${randomEmail}), accept terms, enter password: ${data.testPassword}`);
      await signUpPage.typeEmail(randomEmail);
      await signUpPage.acceptTerms();
      await signUpPage.typePassword(data.testPassword);
      console.log('Step: Click SIGNUP');
      await signUpPage.clickSignUp();
      await expect(browser).toHaveUrl(expect.stringContaining('/sign-up'));
      console.log(`Expected Result: Error message contains is visible`);
      await expect(signUpPage.passwordInput).toHaveAttribute('aria-invalid', 'true');
      await expect(signUpPage.passwordError).toBeDisplayed();
    });
  });
});