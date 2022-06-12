// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import moment from 'moment'
import { apiServer } from '../../cypress.json'

import dashboardPage from "./pages/dashboard";
import loginPage from "./pages/login"


// App Actions
Cypress.Commands.add('uiLogin', function (user) {

    loginPage.acessarHomepage()
    loginPage.preencherCampos(user)
    loginPage.clicarEntrar()
    dashboardPage.header.verificaUsuarioAutenticado(user.name)
})

Cypress.Commands.add('postUser', function (user) {

    cy.task('removeUser', user.email)
        .then(function (result) {
            console.log(result)
        })
    cy.request({
        method: 'POST',
        url: apiServer + '/users',
        body: user
    }).then(function (response) {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('recuperaPass', function (email) {

    cy.request({
        method: 'POST',
        url: apiServer + '/password/forgot',
        body: { email: email }
    }).then(function (response) {
        expect(response.status).to.eq(204)

        cy.task('procuratoken', email)
            .then(function (result) {
                //console.log(result.token)
                Cypress.env('tokenRecuperado', result.token)
            })
    })
})

Cypress.Commands.add('criarApontamento', function (hora) {

    let datacorrente = new Date()
    datacorrente.setDate(datacorrente.getDate() + 1)

    Cypress.env('agendamentoDia', datacorrente.getDate())

    const diaAgenda = moment(datacorrente).format(`YYYY-MM-DD ${hora}:00`)

    const payload = {
        provider_id: Cypress.env('providerId'),
        date: diaAgenda
    }

    cy.request({
        method: 'POST',
        url: apiServer + '/appointments',
        body: payload,
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }

    }).then(function (response) {
        expect(response.status).to.eq(200)

    })
})

Cypress.Commands.add('setProviderId', function (providerEmail) {

    cy.request({
        method: 'GET',
        url: apiServer + '/providers',
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }
    }).then(function (response) {
        expect(response.status).to.eq(200)
        cy.log(response.body)

        const providerlist = response.body


        providerlist.forEach(function (provider) {
            if (provider.email === providerEmail) {

                Cypress.env('providerId', provider.id)
            }
        })
    })
})

Cypress.Commands.add('apiLogin', function (user, setLocalStorage = false) {

    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: apiServer + '/sessions',
        body: payload

    }).then(function (response) {
        expect(response.status).to.eq(200)
        Cypress.env('apiToken', response.body.token)

        if (setLocalStorage) {
            const { token, user } = response.body

            window.localStorage.setItem('@Samurai:token', token)
            window.localStorage.setItem('@Samurai:user', JSON.stringify(user))
        }
    })
    if (setLocalStorage) {
        cy.visit('/dashboard')
    }
})