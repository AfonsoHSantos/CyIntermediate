import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Set milestone on issue', options, () => {
	const issue = {
		title: `issue-${faker.datatype.uuid()}`,
		description: faker.random.words(5),
		project: {
			name: `project-${faker.datatype.uuid()}`,
			description: faker.random.words(5)
		}
	}

	const label = {
		name: `label-${faker.random.word()}`,
		color: '#ffaabb'
	}

    const milestone = {
        title: `milestone-${faker.random.word()}`
    }

	beforeEach(() => {
		cy.api_deleteProjects()
		cy.login()
		cy.api_createIssue(issue)
		.then(response => {
			cy.api_createLabel(response.body.project_id, label)
            cy.api_createMilestone(response.body.project_id, milestone)
			cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
		})
	})

it('GAUC-6: Can set milestone on issue', () => {
    cy.setLabelOnIssue(label)

    cy.get('.qa-labels-block').should('contain', label.name)
    cy.get('.qa-labels-block span')
    	.should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`)
    })
})