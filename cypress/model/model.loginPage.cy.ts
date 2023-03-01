const LOGIN_INPUT = '[data-testid="login-input"]'
const PASSWORD_INPUT = '[data-testid="password-input"]'
const LOGIN_SUBMIT_BUTTON = '[data-testid="login-button"]'
const LOGIN_TOOLTIP = '[data-id=login_id] + div .login-tooltip i'
const PASSWORD_TOOLTIP = '.login-tooltip-wrapper  [data-id=login_password] i'
const TOOLTIP_TEXT = '.ui-tooltip-content'
const TOOLTIP_TEXT2 = '.ui-tooltip-content'

const getLoginInput = () => cy.get(LOGIN_INPUT)
const getPasswordInput = () => cy.get(PASSWORD_INPUT)
const getLoginButton = () => cy.get(LOGIN_SUBMIT_BUTTON)
const getLoginTooltip = () => cy.get(LOGIN_TOOLTIP)
const getPasswordTooltip = () => cy.get(PASSWORD_TOOLTIP)
const getTooltipText = () => cy.get(TOOLTIP_TEXT)
const getTooltipText2 = () => cy.get(TOOLTIP_TEXT2)

type LoginPage = {
  openLoginPage: (url: string) => void
  fillForm: (username: string, password: string) => void
  submitForm: () => void
  checkTitle: (expectedTitle: string) => void
  checkUrl: (expectedURL: string) => void
  assertions: {
    containsWelcomeMessage: () => void
    hasUsernameValue: (username: string) => void
    hasPasswordValue: (password: string) => void
    isSubmitButtonEnabled: (isEnabled: boolean) => void
    hasLoginInputBorderColor: (expectedColor: string) => void
    hasPasswordInputBorderColor: (expectedColor: string) => void
    hasLoginTooltipText: (expectedText: string) => void
    hasPasswordTooltipText: (expectedText: string) => void
    clearPasswordInput: () => void
    clearLoginInput: () => void
  }
}

export const LoginPage = (): LoginPage => {
  const openLoginPage = url => {
    cy.visit(url)
  }
  const checkTitle = expectedTitle => {
    cy.title().should('eq', expectedTitle)
  }

  const checkUrl = expectedURL => {
    cy.url().should('eq', expectedURL)
  }
  const fillForm = (username, password) => {
    getLoginInput().type(username)
    getPasswordInput().type(password, {log: false})
  }
  const submitForm = () => {
    getLoginButton().click()
  }

  return {
    openLoginPage,
    fillForm,
    submitForm,
    checkTitle,
    checkUrl,
    assertions: {
      containsWelcomeMessage: () => cy.contains('Welcome, user!'),
      hasUsernameValue: username => getLoginInput().should('have.value', username),
      hasPasswordValue: password => getPasswordInput().should('have.value', password),
      isSubmitButtonEnabled: isEnabled => getLoginButton().should(isEnabled ? 'be.enabled' : 'be.disabled'),
      hasLoginInputBorderColor: expectedColor => getLoginInput().should('have.css', 'border-color', expectedColor),
      hasPasswordInputBorderColor: expectedColor =>
        getPasswordInput().blur().should('have.css', 'border-color', expectedColor),
      clearPasswordInput: () => {
        getPasswordInput().clear()
      },
      clearLoginInput: () => {
        getLoginInput().clear()
      },
      hasLoginTooltipText: expectedText => {
        getLoginTooltip().realHover()
        getTooltipText()
          .wait(500)
          .should($div => {
            expect($div.get(0).innerText).to.eq(expectedText)
          })
      },
      hasPasswordTooltipText: expectedText => {
        getPasswordTooltip().realHover()
        getTooltipText2()
          .wait(500)
          .should($tooltip => {
            expect($tooltip.get(0).innerText).to.eq(expectedText)
          })
      }
    }
  }
}
