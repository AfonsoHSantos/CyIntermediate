Cypress.Commands.add('login', (
	user = Cypress.env('user_name'),
	password = Cypress.env('user_password'),
	{ cacheSession = true } = {},
) => {
	const login = () => {
		cy.visit('/users/sign_in')

		cy.get("[data-qa-selector='login_field']").type(user)
		cy.get("[data-qa-selector='password_field']").type(password, { log: false })
		cy.get("[data-qa-selector='sign_in_button']").click()
	}

	const validate = () => {
		cy.visit('/')
		cy.location('pathname', { timeout: 1000 })
			.should('not.eq', '/users/sign_in')
	}

	const options = {
		cacheAcrossSpecs: true,
		validate,
	}

	if (cacheSession) {
		cy.session(user, login, options)
	} else {
		login()
	}
})

Cypress.Commands.add('logout', () => {
		cy.get('.qa-user-avatar').click()
		cy.contains('Sign out').click()
})

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
