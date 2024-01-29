const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

Cypress.Commands.add('api_createProject', project => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/`,
    body: {
      name: project.name,
      description: project.description,
      initialize_with_readme: true
    },
    headers: { Authorization: accessToken },
  })
})
Cypress.Commands.add('api_createIssue', issue => {
    cy.api_createProject(issue.project)
    .then(response => {
        cy.request({
          method: 'POST',
          url: `/api/v4/projects/${response.body.id}/issues`,
          body: {
            title: issue.title,
            description: issue.description
          },
          headers: { Authorization: accessToken },
        })
    })
})

