import {basePage, BasePage} from './model.basePage.cy'

const ACCOUNT_NAME = '[data-testid="user-name"]'
const ACCOUNT_NUMBER = '#account_number'

const getAccountName = () => cy.get(ACCOUNT_NAME)
const getAccountNumber = () => cy.get(ACCOUNT_NUMBER)

export type PulpitPage = BasePage & {
  assertions: {
    hasAccountName: (account_name: string) => void
    hasAccountNumber: (account_number: string) => void
  }
}

export const createPulpitPage = (): PulpitPage => {
  const base = basePage()
  const assertions = {
    hasAccountName: account_name => getAccountName().should('have.text', account_name),
    hasAccountNumber: account_number => getAccountNumber().should('have.text', account_number)
  }
  return {
    ...base,
    assertions
  }
}
