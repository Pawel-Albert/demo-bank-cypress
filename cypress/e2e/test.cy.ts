import { LoginPage } from "../model/login.cy";

describe("Login validation", () => {
  const loginPage = LoginPage();
  beforeEach(() => {
    loginPage.openLoginPage("/");
  });
  it("Static elements validation", () => {
    loginPage.checkUrl("https://demo-bank.vercel.app/");
    loginPage.checkTitle("Demobank - Bankowość Internetowa - Logowanie");
  });

  it("Login inputs validation", () => {
    loginPage.assertions.isSubmitButtonEnabled(false);
    loginPage.fillForm("Test1234", "12345678");
    loginPage.assertions.hasPasswordValue("12345678");
    loginPage.assertions.hasUsernameValue("Test1234");
    loginPage.assertions.hasLoginInputBorderColor("rgb(4, 180, 62)");
    loginPage.assertions.hasPasswordInputBorderColor("rgb(4, 180, 62)");
    loginPage.assertions.isSubmitButtonEnabled(true);
  });

  it("Loging with valid credentials", () => {
    loginPage.fillForm("Test1234", "12345678");
    loginPage.submitForm();
  });
});
