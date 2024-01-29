Cypress.Commands.add('createProject', project => {
	cy.visit('/projects/new')

	cy.get('#project_name').type(project.name)

	cy.get('#project_description').type(project.name)

	cy.get('#project_initialize_with_readme').check()

	cy.contains('Create project').click()
})

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

Cypress.Commands.add('setLabelOnIssue', label => {
	cy.get('.qa-edit-link-labels').click()
	cy.contains(label.name).click()
	cy.get('body').click()
})

Cypress.Commands.add('setMilestoneOnIssue', label => {
	cy.get('.qa-edit-link-milestones').click()
	cy.contains(milestone.title).click()
	cy.get('body').click()
})
