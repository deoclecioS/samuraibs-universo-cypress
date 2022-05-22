/// <reference types="cypress"/>

describe('Agendamentos', function () {


    context('Quando é realizado o agendamento no app mobile', function () {

        const data = {
            cliente: {
                name: 'Seu Barriga',
                email: 'barriga@televisa.com',
                password: 'pwd1234',
                is_provider: false
            },
            barbersamurai: {
                name: 'Edward Tesoura',
                email: 'edward@maosdetesousa.com',
                password: 'senha123',
                is_provider: true
            }
        }

        before(function () {
            cy.postUser(data.cliente)
            cy.postUser(data.barbersamurai)

            cy.apiLogin(data.cliente)
            cy.log('Conseguimos o Token ' + Cypress.env('apiToken'))
        })
        it('Deverá ser apresentado no dashboard de agendamentos', function () {
            console.log(data)


        });
    });

});

Cypress.Commands.add('apiLogin', function (user) {

    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: payload

    }).then(function(response){
        expect(response.status).to.eq(200)
        Cypress.env('apiToken', response.body.token)
    })
})