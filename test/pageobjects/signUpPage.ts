import Page from './page.js';

class SignUpPage extends Page {
  readonly PAGE_URL = '/sign-up';
  
  get emailInput() {
    return $('#sign-up-email, input[type="email"]'); 
  }
  get passwordInput() {
    return $('#sign-up-password, input[type="password"]');
  }
  get termsCheckbox() {
    return $('#sign-up-terms');
  }
  get emailError() {
    return $('#sign-up-email_message');
  }
  get passwordError() {
    return $('#sign-up-password_message');
  }
  get termsError() {
    return $('#sign-up-terms_message');
  }
  get signUpButton() {
    return $('span[data-content="Signup"]');
  }

  async open() {
    await super.open(this.PAGE_URL);
  }
  async typeEmail(email: string) {
    await this.emailInput.setValue(email);
  }
  async typePassword(password: string) {
    await this.passwordInput.setValue(password);
  }
  async acceptTerms() {
    await this.termsCheckbox.click();
  }
  async clickSignUp() {
    await this.signUpButton.click();
  }
}

export const signUpPage = new SignUpPage();