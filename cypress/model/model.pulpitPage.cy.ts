import {basePage, BasePage} from './model.basePage.cy'

const ACCOUNT_NAME = '[data-testid="user-name"]'
const ACCOUNT_NUMBER = '#account_number'
const SESSION_TIME = '#session_time'
const MAIN_NAV_BAR = '".nav-main > ul"'
const BALANCE_INT_PART = '#money_value'
const SIDE_BAR_ELEMENTS = {
  mój_pulptit: '#pulpit_btn',
  szybki_przelew: '.nav-main [href="quick_payment.html"]',
  konta_osobiste: '.nav-main [href="konta.html"]'
}

const getAccountName = () => cy.get(ACCOUNT_NAME)
const getAccountNumber = () => cy.get(ACCOUNT_NUMBER)
const getSessionTime = () => cy.get(SESSION_TIME)
const getMainNavBar = () => cy.get(MAIN_NAV_BAR)
const getBalanceIntPart = () => cy.get(BALANCE_INT_PART)
const getFastPaymentSideBar = () => cy.get(SIDE_BAR_ELEMENTS.szybki_przelew)
const getMainDashboardSideBar = () => cy.get(SIDE_BAR_ELEMENTS.mój_pulptit)
const getPersonalAccountsSideBar = () => cy.get(SIDE_BAR_ELEMENTS.konta_osobiste)

export type PulpitPage = BasePage & {
  clickFastPaymentSideBar: () => void
  clickMainDashboardSideBar: () => void
  clickPersonalAccountsSideBar: () => void
  _activeTextColor: (selector: string, color: string) => void
  assertions: {
    hasAccountName: (account_name: string) => void
    hasAccountNumber: (account_number: string) => void
    hasMainNavBar: () => void
    hasSessionTime: () => void
    hasBalance: () => void
    hasFastPaymentSideBarActiveTextColor: (color: string) => void
    hasMainDashboardSideBarActiveTextColor: (color: string) => void
    hasPersonalAccountsSideBarActiveTextColor: (color: string) => void
  }
}

export const createPulpitPage = (): PulpitPage => {
  const base = basePage()

  const clickFastPaymentSideBar = () => getFastPaymentSideBar().click()
  const clickMainDashboardSideBar = () => getMainDashboardSideBar().click()
  const clickPersonalAccountsSideBar = () => getPersonalAccountsSideBar().click()
  const _activeTextColor = (selector: string, color: string) => {
    cy.get(selector).should('have.css', 'color', color)
  }

  const assertions = {
    hasAccountName: account_name => getAccountName().should('have.text', account_name),
    hasAccountNumber: account_number => getAccountNumber().should('have.text', account_number),
    hasMainNavBar: () => getMainNavBar().should('be.visible'),
    hasSessionTime: () => getSessionTime().should('be.visible'),
    hasBalance: () => {
      getBalanceIntPart()
        .invoke('text')
        .then((text: string) => {
          const parsedValue = parseFloat(text.replace(/[^0-9.-]+/g, ''))
          expect(parsedValue).to.be.a('number')
        })
    },
    hasFastPaymentSideBarActiveTextColor: (color: string) => _activeTextColor(SIDE_BAR_ELEMENTS.szybki_przelew, color),
    hasMainDashboardSideBarActiveTextColor: (color: string) => _activeTextColor(SIDE_BAR_ELEMENTS.mój_pulptit, color),
    hasPersonalAccountsSideBarActiveTextColor: (color: string) =>
      _activeTextColor(SIDE_BAR_ELEMENTS.konta_osobiste, color)
  }
  return {
    ...base,
    clickFastPaymentSideBar,
    clickMainDashboardSideBar,
    clickPersonalAccountsSideBar,
    _activeTextColor,
    assertions
  }
}
