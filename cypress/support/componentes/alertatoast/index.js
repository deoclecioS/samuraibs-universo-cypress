

import {localizador} from './elements'

class Toast {
    validamensagemtoastAlerta(mensagemesperada) {

        cy.get(localizador.alertaToast).should('be.visible')
            .find('p')
            .should('have.text', mensagemesperada)
    }
}
export default new Toast()