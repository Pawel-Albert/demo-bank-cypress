import {createLoginPage} from '../model/model.loginPage.cy'
import {createPulpitPage, PulpitPage} from '../model/model.pulpitPage.cy'
import {validCredentials} from '../fixtures/data.loginPage'
import * as pulpitPageData from '../fixtures/data.pulpitPage'
import {borderColors, activeTextColor} from '../fixtures/data.general'

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
    pulpitPage.checkTitle(pulpitPageData.pageTitles.mój_pulpit)
  })

  it('Session time displayed', () => {
    pulpitPage.assertions.hasSessionTime()
  })

  it('Balance is displayed', () => {
    pulpitPage.assertions.hasBalance()
  })

  it('Side menu is displayed - fast payments', () => {
    pulpitPage.clickFastPaymentSideBar()
    pulpitPage.checkUrl(Cypress.config().baseUrl + pulpitPageData.staticPageUrls.szybki_przelew)
    pulpitPage.checkTitle(pulpitPageData.pageTitles.szybki_przelew)
    pulpitPage.assertions.hasFastPaymentSideBarActiveTextColor(activeTextColor) // it will fail due to the small bug on website
  })

  it('Side menu is displayed - main dashboard', () => {
    pulpitPage.clickMainDashboardSideBar()
    pulpitPage.checkUrl(Cypress.config().baseUrl + pulpitPageData.staticPageUrls.mój_pulpit)
    pulpitPage.checkTitle(pulpitPageData.pageTitles.mój_pulpit)
    pulpitPage.assertions.hasMainDashboardSideBarActiveTextColor(activeTextColor)
  })

  it('Side menu is displayed - personal accounts', () => {
    pulpitPage.clickPersonalAccountsSideBar()
    pulpitPage.checkUrl(Cypress.config().baseUrl + pulpitPageData.staticPageUrls.konta_osobiste)
    pulpitPage.checkTitle(pulpitPageData.pageTitles.konta_osobiste)
    pulpitPage.assertions.hasPersonalAccountsSideBarActiveTextColor(activeTextColor)
  })
})
