

import { localizador } from './elements'
import alertatoast from '../../componentes/alertatoast'

class recuperasenhaPage {


    constructor() {
        this.alertatoast = alertatoast
    }

    visitapagina(token) {

        cy.visit('/reset-password?token=' + token)
    }

    formsenhas(novasenha, confirmanovasenha) {

        cy.get(localizador.senhanova1)
            .clear()
            .type(novasenha)

        cy.get(localizador.senhanova2)
            .clear()
            .type(confirmanovasenha)
    }


    clickalteraSenha() {
        cy.get(localizador.botaoalterasenha)
            .click()
    }

}

export default new recuperasenhaPage()