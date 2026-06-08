Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data={
firstName: 'Keila',
lastName: 'Maria',
email: 'Keila624@gmail.com',
texto:  'Teste Keila'
}) => {
    cy.visit('./src/index.html')

    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.texto)
    cy.contains('button','Enviar').click()

})