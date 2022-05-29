/// <reference types="cypress"/>


import loginPage from '../support/pages/login'
import dashboardPage from '../support/pages/dashboard'

describe('Agendamentos', function () {

    context('Quando é realizado o agendamento no app mobile', function () {

        const data = {
            provider: {
                name: 'Edward Tesoura',
                email: 'edward@maosdetesoura.com',
                password: 'senha123',
                is_provider: true
            },
            cliente: {
                name: 'Seu Barriga',
                email: 'barriga@televisa.com',
                password: 'pwd1234',
                is_provider: false
            },
            horadoagendamento: '14:00'
        }

        before(function () {
            cy.postUser(data.provider)
            cy.postUser(data.cliente)

            cy.apiLogin(data.cliente)
            cy.setProviderId(data.provider.email)
            cy.criarApontamento(data.horadoagendamento)
        })
        it('Deverá ser apresentado no dashboard de agendamentos', function () {

            loginPage.acessarHomepage()
            loginPage.preencherCampos(data.provider)
            loginPage.clicarEntrar()

            dashboardPage.calendarioVisivel()

            const dia = Cypress.env('agendamentoDia')
            dashboardPage.selecionaDia(dia)
            dashboardPage.agendamentoVisivel(data.cliente, data.horadoagendamento)
        })
    })

})