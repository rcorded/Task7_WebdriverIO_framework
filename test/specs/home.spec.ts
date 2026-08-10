import { homePage } from '../pageobjects/homePage';
import { signUpPage } from '../pageobjects/signUpPage';

describe('Header and Footer', () => {
  before(async () => {
    await homePage.open();
    await homePage.acceptCookies();
  });

  beforeEach(async () => {
    await homePage.open();
  });

  it('TC-16: Verify navigation to the Sign Up page via header button', async () => {
    await expect(homePage.headerSignUpButton).toBeDisplayed();
    await homePage.clickHeaderSignUp();
    await expect(browser).toHaveUrl(expect.stringContaining(signUpPage.PAGE_URL));
    await expect(signUpPage.emailInput).toBeDisplayed();
    await expect(signUpPage.signUpButton).toBeDisplayed();
  });

  it('TC-17: Verify LinkedIn link in the footer', async () => {
    await expect(homePage.footerLinkedInIcon).toBeDisplayed();
    await expect(homePage.footerLinkedInIcon).toHaveAttribute(
      'href',
      expect.stringContaining('linkedin.com')
    );
  });

  it('TC-18: Verify Twitter link in the footer', async () => {
    await expect(homePage.footerXIcon).toBeDisplayed();
    await expect(homePage.footerXIcon).toHaveAttribute(
      'href',
      /(twitter\.com|x\.com)/
    );
  });

  it('TC-19: Verify Facebook link in the footer', async () => {
    await expect(homePage.footerFacebookIcon).toBeDisplayed();
    await expect(homePage.footerFacebookIcon).toHaveAttribute(
      'href',
      expect.stringContaining('facebook.com')
    );
  });

  it('TC-20: Verify copyright year matches the current calendar year', async () => {
    const currentYear = new Date().getFullYear().toString();
    await expect(homePage.copyrightText).toBeDisplayed();
    await expect(homePage.copyrightText).toHaveText(expect.stringContaining(currentYear));
  });
});