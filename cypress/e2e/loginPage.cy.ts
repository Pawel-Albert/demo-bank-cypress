import {createLoginPage} from '../model/model.loginPage.cy'
import {validCredentials, invalidCredentials, borderColors, tooltipText} from '../fixtures/data.loginPage'

describe('Login Page validation', () => {
  const loginPage = createLoginPage()
  beforeEach(() => {
    loginPage.openPage('/')
  })
  it('Static elements validation', () => {
    loginPage.checkUrl(Cypress.config().baseUrl)
    loginPage.checkTitle('Demobank - Bankowość Internetowa - Logowanie')
  })

  it('Tooltip - login input', {retries: 2}, () => {
    loginPage.assertions.hasLoginTooltipText(tooltipText.login)
  })

  it('Tooltip - password input', {retries: 2}, () => {
    loginPage.assertions.hasPasswordTooltipText(tooltipText.password)
  })

  it('Login inputs validation - valid credentials', () => {
    loginPage.assertions.isSubmitButtonEnabled(false)
    loginPage.fillForm(validCredentials.userName, validCredentials.password)
    loginPage.assertions.hasPasswordValue(validCredentials.password)
    loginPage.assertions.hasUsernameValue(validCredentials.userName)
    loginPage.assertions.hasLoginInputBorderColor(borderColors.validGreen)
    loginPage.assertions.hasPasswordInputBorderColor(borderColors.validGreen)
    loginPage.assertions.isSubmitButtonEnabled(true)
  })

  const numberOfIterations = invalidCredentials.length
  invalidCredentials.forEach((data, index) => {
    it(`Login inputs validation - invalid credentials - ${index + 1}/${numberOfIterations}`, () => {
      loginPage.fillForm(data.userName, data.password)
      loginPage.assertions.hasLoginInputBorderColor(borderColors.invalidRed)
      loginPage.assertions.hasPasswordInputBorderColor(borderColors.invalidRed)
      loginPage.assertions.isSubmitButtonEnabled(false) // it will fail due to the small bug on website
    })
  })

  it('Login inputs validation - empty inputs', () => {
    loginPage.clearLoginInput()
    loginPage.clearPasswordInput()
    loginPage.assertions.hasLoginInputBorderColor(borderColors.invalidRed)
    loginPage.assertions.hasPasswordInputBorderColor(borderColors.invalidRed)
  })

  it('Login with valid credentials', () => {
    loginPage.fillForm(validCredentials.userName, validCredentials.password)
    loginPage.submitForm()
    loginPage.checkUrl(Cypress.config().baseUrl + 'pulpit.html')
    loginPage.checkTitle('Demobank - Bankowość Internetowa - Pulpit')
  })
})
