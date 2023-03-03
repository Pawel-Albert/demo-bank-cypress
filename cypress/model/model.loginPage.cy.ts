import {basePage, BasePage} from './model.basePage.cy'

const LOGIN_INPUT = '[data-testid="login-input"]'
const PASSWORD_INPUT = '[data-testid="password-input"]'
const LOGIN_SUBMIT_BUTTON = '[data-testid="login-button"]'
const LOGIN_TOOLTIP = '[data-id=login_id] + div .login-tooltip i'
const PASSWORD_TOOLTIP = '.login-tooltip-wrapper  [data-id=login_password] i'
const TOOLTIP_TEXT = '.ui-tooltip-content'

const getLoginInput = () => cy.get(LOGIN_INPUT)
const getPasswordInput = () => cy.get(PASSWORD_INPUT)
const getLoginButton = () => cy.get(LOGIN_SUBMIT_BUTTON)
const getLoginTooltip = () => cy.get(LOGIN_TOOLTIP)
const getPasswordTooltip = () => cy.get(PASSWORD_TOOLTIP)
const getTooltipText = () => cy.get(TOOLTIP_TEXT)

type LoginPage = BasePage & {
  fillForm: (username: string, password: string) => void
  submitForm: () => void
  clearPasswordInput: () => void
  clearLoginInput: () => void
  assertions: {
    hasUsernameValue: (username: string) => void
    hasPasswordValue: (password: string) => void
    isSubmitButtonEnabled: (isEnabled: boolean) => void
    hasLoginInputBorderColor: (expectedColor: string) => void
    hasPasswordInputBorderColor: (expectedColor: string) => void
    hasLoginTooltipText: (expectedText: string) => void
    hasPasswordTooltipText: (expectedText: string) => void
  }
}

export const createLoginPage = (): LoginPage => {
  const base = basePage()
  const fillForm = (username, password) => {
    getLoginInput().type(username)
    getPasswordInput().type(password, {log: false})
  }
  const submitForm = () => {
    getLoginButton().click()
  }

  const clearPasswordInput = () => {
    getPasswordInput().clear()
  }
  const clearLoginInput = () => {
    getLoginInput().clear()
  }

  const assertions = {
    hasUsernameValue: username => getLoginInput().should('have.value', username),
    hasPasswordValue: password => getPasswordInput().should('have.value', password),
    isSubmitButtonEnabled: isEnabled => getLoginButton().should(isEnabled ? 'be.enabled' : 'be.disabled'),
    hasLoginInputBorderColor: expectedColor => getLoginInput().should('have.css', 'border-color', expectedColor),
    hasPasswordInputBorderColor: expectedColor =>
      getPasswordInput().blur().should('have.css', 'border-color', expectedColor),

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
      getTooltipText()
        .wait(500)
        .should($tooltip => {
          expect($tooltip.get(0).innerText).to.eq(expectedText)
        })
    }
  }

  return {
    ...base,
    fillForm,
    submitForm,
    clearPasswordInput,
    clearLoginInput,
    assertions
  }
}
