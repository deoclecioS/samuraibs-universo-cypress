

import { localizador } from './elements'

import alertatoast from '../../componentes/alertatoast/'
import alerta from '../../componentes/alertacampos'

class SignupPage {

    constructor() {

        this.alertatoast = alertatoast
        this.alerta = alerta
    }

    acessarpagina() {
        cy.visit('/signup')

        cy.contains(localizador.titulo)
        .should('be.visible')
    }

    preencheformulario(user) {
        cy.get(localizador.name)
            .clear()
            .type(user.name)
        cy.get(localizador.email)
            .clear()
            .type(user.email)
        cy.get(localizador.password)
            .clear()
            .type(user.password)
    }

    clicaremcadastrar() {

        cy.contains(localizador.botaoCadastrar).click()
    }
}

export default new SignupPage()