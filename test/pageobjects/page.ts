import { browser } from '@wdio/globals';

export default class Page {
  get headerSignUpButton() {
    return $('header a[href="/sign-up"]');
  }
  get footerLinkedInIcon() {
    return $('footer a[href*="linkedin.com"]');
  }
  get footerXIcon() {
    return $('footer a[href*="x.com"]');
  }
  get footerFacebookIcon() {
    return $('footer a[href*="facebook.com"]');
  }
  get copyrightText() {
    return $('//footer//div[contains(text(),"©")]');
  }

  open(path: string) {
    return browser.url(path);
  }
  async clickHeaderSignUp() {
    await this.headerSignUpButton.click();
  }
  async acceptCookies() {
    const acceptBtn = $('#onetrust-accept-btn-handler');
    try {
      await acceptBtn.waitForDisplayed({ timeout: 6000 });
      await acceptBtn.click();
      await acceptBtn.waitForDisplayed({ timeout: 5000, reverse: true });
      console.log('Cookie banner successfully closed.');
    } catch (error) {
      console.log('Cookie banner not found or already closed.');
    }
  }
}