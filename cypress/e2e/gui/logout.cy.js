describe('Logout', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/')
})
  
it('perform logout', () => {
    cy.logout()

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
})
})