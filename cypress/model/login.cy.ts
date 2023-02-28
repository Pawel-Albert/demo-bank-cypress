const LOGIN_INPUT = '[data-testid="login-input"]';
const PASSWORD_INPUT = '[data-testid="password-input"]';
const LOGIN_BUTTON = '[data-testid="login-button"]';

const getLoginInput = () => cy.get(LOGIN_INPUT);
const getPasswordInput = () => cy.get(PASSWORD_INPUT);
const getLoginButton = () => cy.get(LOGIN_BUTTON);

type LoginPage = {
  openLoginPage: (url: string) => void;
  fillForm: (username: string, password: string) => void;
  submitForm: () => void;
  checkTitle: (expectedTitle: string) => void;
  checkUrl: (expectedURL: string) => void;
  assertions: {
    containsWelcomeMessage: () => void;
    hasUsernameValue: (username: string) => void;
    hasPasswordValue: (password: string) => void;
    isSubmitButtonEnabled: (isEnabled: boolean) => void;
    hasLoginInputBorderColor: (expectedColor: string) => void;
    hasPasswordInputBorderColor: (expectedColor: string) => void;
  };
};

export const LoginPage = (): LoginPage => {
  const openLoginPage = (url) => {
    cy.visit(url);
  };
  const checkTitle = (expectedTitle) => {
    cy.title().should("eq", expectedTitle);
  };

  const checkUrl = (expectedURL) => {
    cy.url().should("eq", expectedURL);
  };
  const fillForm = (username, password) => {
    getLoginInput().type(username);
    getPasswordInput().type(password);
  };
  const submitForm = () => {
    getLoginButton().click();
  };

  return {
    openLoginPage,
    fillForm,
    submitForm,
    checkTitle,
    checkUrl,
    assertions: {
      containsWelcomeMessage: () => cy.contains("Welcome, user!"),
      hasUsernameValue: (username) =>
        getLoginInput().should("have.value", username),
      hasPasswordValue: (password) =>
        getPasswordInput().should("have.value", password),
      isSubmitButtonEnabled: (isEnabled) =>
        getLoginButton().should(isEnabled ? "be.enabled" : "be.disabled"),
      hasLoginInputBorderColor: (expectedColor) =>
        getLoginInput().should("have.css", "border-color", expectedColor),
      hasPasswordInputBorderColor: (expectedColor) =>
        getPasswordInput()
          .blur()
          .should("have.css", "border-color", expectedColor),
    },
  };
};
