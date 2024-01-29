import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Create Project', options, () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
  })

it('GAUC-4: Can create project via GUI', () => {
    const project = {
    	name: `project-${faker.datatype.uuid()}`,
    	description: faker.random.words(5)
    }

    cy.api_createProject(project)

    cy.url().visit(`${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
    cy.contains(project.name).should('be.visible')
    cy.contains(project.description).should('be.visible')
    })
})