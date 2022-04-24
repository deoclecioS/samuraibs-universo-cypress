

import { localizador } from './elements'

import alertatoast from '../../componentes/alertatoast/'

class SignupPage {

    constructor() {

        this.alertatoast = alertatoast;

    }

    acessarpagina() {
        cy.visit('/signup')
    }

    preencheformulario(user) {
        cy.get(localizador.name).type(user.name)
        cy.get(localizador.email).type(user.email)
        cy.get(localizador.password).type(user.password)
    }

    clicaremcadastrar() {

        cy.contains(localizador.botaoCadastrar).click()
    }

    mensagemalerta(mensagemesperada){
        cy.get(localizador.alerta , mensagemesperada).should('be.visible')
    }
}

export default new SignupPage()