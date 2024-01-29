Cypress.Commands.add('createIssue', issue => {
	cy.visit('/dashboard/issues')

	cy.get('.new-project-item-link').click()

	cy.get('#s2id_autogen1_search').type(issue.project.name)

	cy.contains(issue.project.name).click()

	cy.get('.project-item-select-holder').click()

	cy.get('#issue_title').type(issue.title)

	cy.get('#issue_description').type(issue.description)

	cy.contains('Submit issue').click()
})
