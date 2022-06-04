/// <reference types="cypress"/>


import loginPage from '../support/pages/login'
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

            loginPage.acessarHomepage()
            loginPage.preencherCampos(provider)
            loginPage.clicarEntrar()

            dashboardPage.calendarioVisivel()

            const dia = Cypress.env('agendamentoDia')
            dashboardPage.selecionaDia(dia)
            dashboardPage.agendamentoVisivel(cliente, horadoagendamento.hora)
        })
    })

})