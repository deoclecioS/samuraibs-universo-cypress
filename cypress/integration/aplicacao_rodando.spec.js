/// <reference types="cypress"/>

// comentario de edicao no git - teste
it('webapp deve estar online', () => {
    cy.visit('/')
    cy.title()
        .should('equal' , 'Samurai Barbershop by QAninja')
});
