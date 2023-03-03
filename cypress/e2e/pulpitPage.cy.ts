import {createLoginPage} from '../model/model.loginPage.cy'
import {createPulpitPage, PulpitPage} from '../model/model.pulpitPage.cy'
import {validCredentials} from '../fixtures/data.loginPage'
import * as pulpitPageData from '../fixtures/data.pulpitPage'
import {borderColors} from '../fixtures/data.general'

describe('Pulpit base validation', () => {
  const loginPage = createLoginPage()
  const pulpitPage = createPulpitPage()

  beforeEach(() => {
    loginPage.openPage('/')
    loginPage.fillForm(validCredentials.userName, validCredentials.password)
    loginPage.submitForm()
  })

  it('Static elements validation after user login', () => {
    pulpitPage.assertions.hasAccountName(pulpitPageData.user.name)
    pulpitPage.assertions.hasAccountNumber(pulpitPageData.user.accountNumber)
    pulpitPage.checkUrl(Cypress.config().baseUrl + 'pulpit.html')
    pulpitPage.checkTitle(pulpitPageData.pageTitle)
  })
})
