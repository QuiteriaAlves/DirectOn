Cypress.Commands.add('logoff', () => {
    cy.get('#container-3 > toolbar > mat-toolbar > div > div > button > span > ng-icon > svg[class="bi bi-three-dots-vertical"]').click()
    cy.contains('div', 'Sair').click()
})