/// <reference types="cypress"/>


import dashboardPage from '../support/pages/dashboard'

import { provider, cliente, horadoagendamento } from '../support/factories/agenda'

describe('Agendamentos', function () {

    context('Quando é realizado o agendamento no app mobile', function () {

        before(function () {
            cy.postUser(provider)
            cy.postUser(cliente)

            cy.apiLogin(cliente)
            cy.setProviderId(provider.email)
            cy.criarApontamento(horadoagendamento.hora)
        })
        it('Deverá ser apresentado no dashboard de agendamentos', function () {

            const dia = Cypress.env('agendamentoDia')

            //cy.uiLogin(provider) 
            // comando abaixo tem ligação com o comando customizado apiLogin true/false
            cy.apiLogin(provider, true)

            dashboardPage.calendarioVisivel()
            dashboardPage.selecionaDia(dia)
            dashboardPage.agendamentoVisivel(cliente, horadoagendamento.hora)

        })
    })
})