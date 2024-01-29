import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Create issue', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
  })

it('GAUC-5: Can create issue', () => {
    cy.api_createIssue(issue)
    .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.title).to.equal(issue.title)
        expect(response.body.description).to.equal(issue.description)
      })
    })
})