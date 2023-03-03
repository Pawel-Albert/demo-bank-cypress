export type BasePage = {
  openPage: (url: string) => void
  checkTitle: (expectedTitle: string) => void
  checkUrl: (expectedURL: string) => void
}

export const basePage = (): BasePage => {
  const openPage = url => {
    cy.visit(url)
  }
  const checkTitle = expectedTitle => {
    cy.title().should('eq', expectedTitle)
  }

  const checkUrl = expectedURL => {
    cy.url().should('eq', expectedURL)
  }

  return {
    openPage,
    checkTitle,
    checkUrl
  }
}
