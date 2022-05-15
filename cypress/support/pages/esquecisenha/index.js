

import { localizador } from './elements'
import alertatoast from '../../componentes/alertatoast'

class esqueciSenha {

    constructor(){
        this.alertatoast = alertatoast
    }

    visitarpagina() {

        cy.visit('/forgot-password')
    }

    formularioemail(email) {
        cy.get(localizador.email)
            .clear()
            .type(email)
    }

    clicarecupera(){

        cy.get(localizador.botaorecuperar).click()
    }


}

export default new esqueciSenha()